import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import { v4 as uuid } from 'uuid';
import * as t from './types';
import { generate, GenerateOptions } from './generator';

export interface InjectOptions
  extends Pick<
    GenerateOptions,
    | 'sortProptypes'
    | 'includeJSDoc'
    | 'comment'
    | 'disablePropTypesTypeChecking'
    | 'reconcilePropTypes'
    | 'ensureBabelPluginTransformReactRemovePropTypesIntegration'
  > {
  /**
   * By default all unused props are omitted from the result.
   * Set this to true to include them instead.
   */
  includeUnusedProps?: boolean;
  /**
   * Used to control which props are includes in the result
   * @returns true to include the prop, false to skip it, or undefined to
   * use the default behavior
   * @default includeUnusedProps ? true : data.usedProps.includes(data.prop.name)
   */
  shouldInclude?(data: {
    component: t.Component;
    prop: t.PropTypeDefinition;
    usedProps: string[];
  }): boolean | undefined;
  /**
   * You can override the order of literals in unions based on the proptype.
   *
   * By default literals in unions are sorted by:
   * - numbers last, ascending
   * - anything else by their stringified value using localeCompare
   * Note: The order of the literals as they "appear" in the typings cannot be preserved.
   * Sometimes the type checker preserves it, sometimes it doesn't.
   * By always returning 0 from the sort function you keep the order the type checker dictates.
   */
  getSortLiteralUnions?: (
    component: t.Component,
    propType: t.PropTypeDefinition,
  ) => ((a: t.LiteralType, b: t.LiteralType) => number) | undefined;
  /**
   * Options passed to babel.transformSync
   */
  babelOptions?: babel.TransformOptions;
}

/**
 * Gets used props from path
 * @param rootPath The path to search for uses of rootNode
 * @param rootNode The node to start the search, if undefined searches for `this.props`
 */
function getUsedProps(
  rootPath: babel.NodePath,
  rootNode: babelTypes.ObjectPattern | babelTypes.Identifier | undefined,
) {
  const usedProps: string[] = [];

  function getUsedPropsInternal(
    node: babelTypes.ObjectPattern | babelTypes.Identifier | undefined,
  ) {
    if (node && babelTypes.isObjectPattern(node)) {
      node.properties.forEach((x) => {
        if (babelTypes.isObjectProperty(x)) {
          if (babelTypes.isStringLiteral(x.key)) {
            usedProps.push(x.key.value);
          } else if (babelTypes.isIdentifier(x.key)) {
            usedProps.push(x.key.name);
          } else {
            console.warn(
              'Possibly used prop missed because object property key was not an Identifier or StringLiteral.',
            );
          }
        } else if (babelTypes.isIdentifier(x.argument)) {
          // get access props from rest-spread (`{...other}`)
          getUsedPropsInternal(x.argument);
        }
      });
    } else {
      rootPath.traverse({
        VariableDeclarator(path) {
          const init = path.node.init;
          if (
            (node
              ? babelTypes.isIdentifier(init, { name: node.name })
              : babelTypes.isMemberExpression(init) &&
                babelTypes.isThisExpression(init.object) &&
                babelTypes.isIdentifier(init.property, { name: 'props' })) &&
            babelTypes.isObjectPattern(path.node.id)
          ) {
            getUsedPropsInternal(path.node.id);
          } else if (
            // currently tracking `inProps` which stands for the given props e.g. `function Modal(inProps) {}`
            babelTypes.isIdentifier(node, { name: 'inProps' }) &&
            // `const props = ...` assuming the right-hand side has `inProps` as input.
            babelTypes.isIdentifier(path.node.id, { name: 'props' })
          ) {
            getUsedPropsInternal(path.node.id);
          }
        },
        MemberExpression(path) {
          if (
            (node
              ? babelTypes.isIdentifier(path.node.object, { name: node.name })
              : babelTypes.isMemberExpression(path.node.object) &&
                babelTypes.isMemberExpression(path.node.object.object) &&
                babelTypes.isThisExpression(path.node.object.object.object) &&
                babelTypes.isIdentifier(path.node.object.object.property, { name: 'props' })) &&
            babelTypes.isIdentifier(path.node.property)
          ) {
            usedProps.push(path.node.property.name);
          }
        },
      });
    }
  }

  getUsedPropsInternal(rootNode);
  return usedProps;
}

function flattenTsAsExpression(node: object | null | undefined) {
  if (babelTypes.isTSAsExpression(node)) {
    return node.expression as babel.Node;
  }

  return node;
}

function plugin(
  propTypes: t.Program,
  options: InjectOptions = {},
  mapOfPropTypes: Map<string, string>,
): babel.PluginObj {
  const {
    includeUnusedProps = false,
    reconcilePropTypes = (
      _prop: t.PropTypeDefinition,
      _previous: string | undefined,
      generated: string,
    ) => generated,
    ...otherOptions
  } = options;
  const shouldInclude: Exclude<InjectOptions['shouldInclude'], undefined> = (data) => {
    if (options.shouldInclude) {
      const result = options.shouldInclude(data);
      if (result !== undefined) {
        return result;
      }
    }

    return includeUnusedProps ? true : data.usedProps.includes(data.prop.name);
  };

  let importName = '';
  let needImport = false;
  let alreadyImported = false;
  let originalPropTypesPath: null | babel.NodePath = null;
  const previousPropTypesSource = new Map<string, string>();

  function injectPropTypes(injectOptions: {
    path: babel.NodePath;
    usedProps: string[];
    props: t.Component;
    nodeName: string;
  }) {
    const { path, props, usedProps, nodeName } = injectOptions;

    const source = generate(props, {
      ...otherOptions,
      importedName: importName,
      previousPropTypesSource,
      reconcilePropTypes,
      shouldInclude: (prop) => shouldInclude({ component: props, prop, usedProps }),
    });
    const emptyPropTypes = source === '';

    if (!emptyPropTypes) {
      needImport = true;
    }

    const placeholder = `const a${uuid().replace(/-/g, '_')} = null;`;

    mapOfPropTypes.set(placeholder, source);

    // `Component.propTypes` already exists
    if (originalPropTypesPath !== null) {
      originalPropTypesPath.replaceWith(babel.template.ast(placeholder) as babelTypes.Statement);
    } else if (!emptyPropTypes && babelTypes.isExportNamedDeclaration(path.parent)) {
      // in:
      // export function Component() {}
      // out:
      // function Component() {}
      // Component.propTypes = {}
      // export { Component }
      path.insertAfter(babel.template.ast(`export { ${nodeName} };`));
      path.insertAfter(babel.template.ast(placeholder));
      path.parentPath.replaceWith(path.node);
    } else if (!emptyPropTypes && babelTypes.isExportDefaultDeclaration(path.parent)) {
      // in:
      // export default function Component() {}
      // out:
      // function Component() {}
      // Component.propTypes = {}
      // export default Component
      path.insertAfter(babel.template.ast(`export default ${nodeName};`));
      path.insertAfter(babel.template.ast(placeholder));
      path.parentPath.replaceWith(path.node);
    } else {
      path.insertAfter(babel.template.ast(placeholder));
    }
  }

  return {
    visitor: {
      Program: {
        enter(path, state: any) {
          if (
            !path.node.body.some((n) => {
              if (
                babelTypes.isImportDeclaration(n) &&
                n.source.value === 'prop-types' &&
                n.specifiers.length
              ) {
                importName = n.specifiers[0].local.name;
                alreadyImported = true;
                return true;
              }
              return false;
            })
          ) {
            importName = 'PropTypes';
          }

          path.get('body').forEach((nodePath) => {
            const { node } = nodePath;
            if (
              babelTypes.isExpressionStatement(node) &&
              babelTypes.isAssignmentExpression(node.expression, { operator: '=' }) &&
              babelTypes.isMemberExpression(node.expression.left) &&
              babelTypes.isIdentifier(node.expression.left.property, { name: 'propTypes' })
            ) {
              originalPropTypesPath = nodePath as babel.NodePath;

              let maybeObjectExpression = node.expression.right;
              // Component.propTypes = {} as any;
              //                       ^^^^^^^^^ expression.right
              //                       ^^^^^^^^^ TSAsExpression
              //                       ^^ ObjectExpression
              // TODO: Not covered by a unit test but by e2e usage with the docs.
              // Testing infra not setup to handle input=output.
              if (babelTypes.isTSAsExpression(node.expression.right)) {
                maybeObjectExpression = node.expression.right.expression;
              }

              if (babelTypes.isObjectExpression(maybeObjectExpression)) {
                const { code } = state.file;

                maybeObjectExpression.properties.forEach((property) => {
                  if (babelTypes.isObjectProperty(property)) {
                    const validatorSource = code.slice(property.value.start, property.value.end);
                    if (babelTypes.isIdentifier(property.key)) {
                      previousPropTypesSource.set(property.key.name, validatorSource);
                    } else if (babelTypes.isStringLiteral(property.key)) {
                      previousPropTypesSource.set(property.key.value, validatorSource);
                    } else {
                      console.warn(
                        `${state.filename}: Possibly missed original proTypes source. Can only determine names for 'Identifiers' and 'StringLiteral' but received '${property.key.type}'.`,
                      );
                    }
                  }
                });
              }
            }
          });
        },
        exit(path) {
          if (alreadyImported || !needImport) return;

          const propTypesImport = babel.template.ast(
            `import ${importName} from 'prop-types'`,
          ) as babel.types.ImportDeclaration;

          const firstImport = path
            .get('body')
            .find((nodePath) => babelTypes.isImportDeclaration(nodePath.node));

          // Insert import after the first one to avoid issues with comment flags
          if (firstImport) {
            firstImport.insertAfter(propTypesImport);
          } else {
            path.node.body = [propTypesImport, ...path.node.body];
          }
        },
      },
      FunctionDeclaration(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!node.id) return;
        const props = propTypes.body.find((prop) => prop.name === node.id!.name);
        if (!props) return;

        // Prevent visiting again
        (node as any).hasBeenVisited = true;
        path.skip();

        const prop = node.params[0];
        injectPropTypes({
          nodeName: node.id.name,
          usedProps:
            babelTypes.isIdentifier(prop) || babelTypes.isObjectPattern(prop)
              ? getUsedProps(path as babel.NodePath, prop)
              : [],
          path: path as babel.NodePath,
          props,
        });
      },
      VariableDeclaration(path) {
        const { node } = path;

        if (!babelTypes.isIdentifier(node.declarations[0].id)) return;
        const nodeName = node.declarations[0].id.name;

        // Handle any variable with a comment containing `@typescript-to-proptypes-generate`
        if (
          node.leadingComments &&
          node.leadingComments.some((comment) =>
            comment.value.includes('@typescript-to-proptypes-generate'),
          )
        ) {
          if (!propTypes.body.some((prop) => prop.name === nodeName)) {
            console.warn(
              `It looks like the variable at ${node.loc} with /* @typescript-to-proptypes-generate */ is not a component, or props can not be inferred from typescript definitions.`,
            );
          }

          injectPropTypes({
            nodeName,
            usedProps: [],
            path: path as babel.NodePath<babelTypes.Node>,
            props: propTypes.body.find((prop) => prop.name === nodeName)!,
          });
        }
      },
      VariableDeclarator(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!babelTypes.isIdentifier(node.id)) return;
        const nodeName = node.id.name;

        const props = propTypes.body.find((prop) => prop.name === nodeName);
        if (!props) return;

        function getFromProp(propsNode: babelTypes.Node) {
          // Prevent visiting again
          (node as any).hasBeenVisited = true;
          path.skip();

          injectPropTypes({
            path: path.parentPath,
            usedProps:
              babelTypes.isIdentifier(propsNode) || babelTypes.isObjectPattern(propsNode)
                ? getUsedProps(path as babel.NodePath, propsNode)
                : [],
            props: props!,
            nodeName,
          });
        }

        const nodeInit = flattenTsAsExpression(node.init);

        if (
          babelTypes.isArrowFunctionExpression(nodeInit) ||
          babelTypes.isFunctionExpression(nodeInit)
        ) {
          getFromProp(nodeInit.params[0]);
        } else if (babelTypes.isCallExpression(nodeInit)) {
          // x = react.memo(props => <div/>)
          const arg = nodeInit.arguments[0];
          if (babelTypes.isArrowFunctionExpression(arg) || babelTypes.isFunctionExpression(arg)) {
            getFromProp(arg.params[0]);
          }
        }
      },
      ClassDeclaration(path) {
        const { node } = path;

        // Prevent visiting again
        if ((node as any).hasBeenVisited) {
          path.skip();
          return;
        }

        if (!babelTypes.isIdentifier(node.id)) return;
        const nodeName = node.id.name;

        const props = propTypes.body.find((prop) => prop.name === nodeName);
        if (!props) return;

        // Prevent visiting again
        (node as any).hasBeenVisited = true;
        path.skip();

        injectPropTypes({
          nodeName,
          usedProps: getUsedProps(path as babel.NodePath, undefined),
          path: path as babel.NodePath,
          props,
        });
      },
    },
  };
}

/**
 * Injects the PropTypes from `parse` into the provided JavaScript code
 * @param propTypes Result from `parse` to inject into the JavaScript code
 * @param target The JavaScript code to add the PropTypes to
 * @param options Options controlling the final result
 */
export function inject(
  propTypes: t.Program,
  target: string,
  options: InjectOptions = {},
): string | null {
  if (propTypes.body.length === 0) {
    return target;
  }

  const propTypesToInject = new Map<string, string>();

  const { plugins: babelPlugins = [], ...babelOptions } = options.babelOptions || {};
  const result = babel.transformSync(target, {
    plugins: [
      require.resolve('@babel/plugin-syntax-class-properties'),
      require.resolve('@babel/plugin-syntax-jsx'),
      [require.resolve('@babel/plugin-syntax-typescript'), { isTSX: true }],
      plugin(propTypes, options, propTypesToInject),
      ...(babelPlugins || []),
    ],
    configFile: false,
    babelrc: false,
    retainLines: true,
    ...babelOptions,
  });

  let code = result && result.code;
  if (!code) {
    return null;
  }

  // Replace the placeholders with the generated prop-types
  // Workaround for issues with comments getting removed and malformed
  propTypesToInject.forEach((value, key) => {
    code = code!.replace(key, `\n\n${value}\n\n`);
  });

  return code;
}
