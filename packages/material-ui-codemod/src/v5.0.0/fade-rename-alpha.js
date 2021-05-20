/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let importFound = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === '@material-ui/core/styles') {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'fade') {
          specifier.imported.name = 'alpha';
          importFound = true;
        }
      });
    }
  });

  if (importFound) {
    return root
      .find(j.CallExpression, { callee: { name: 'fade' } })
      .forEach((path) => {
        path.node.callee.name = 'alpha';
      })
      .toSource();
  }
  return file.source;
}
