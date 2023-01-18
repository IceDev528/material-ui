const { EOL } = require('os');

/**
 * @param {string} source
 */
function getLineFeed(source: string): string {
  const match = source.match(/\r?\n/);
  return match === null ? EOL : match[0];
}

const fixBabelIssuesRegExp = /(?<=(\/>)|,)(\r?\n){2}/g;
/**
 * @param {string} source
 */
function fixBabelGeneratorIssues(source: string): string {
  return source.replace(fixBabelIssuesRegExp, '\n');
}

/**
 * @param {string} source
 * @param {string} target
 */
function fixLineEndings(source: string, target: string): string {
  return target.replace(/\r?\n/g, getLineFeed(source));
}

/**
 * Converts styled or regular component d.ts file to unstyled d.ts
 * @param {string} filename - the file of the styled or regular mui component
 */
function getUnstyledFilename(filename: string, definitionFile: boolean = false) {
  if (filename.indexOf('Unstyled') > -1) {
    return filename;
  }
  let unstyledFile = '';

  const separator = filename.indexOf('/') > -1 ? '/' : '\\';

  if (filename.indexOf('mui-base') === -1) {
    unstyledFile = filename
      .replace(/.d.ts$/, '')
      .replace(/.tsx?$/, '')
      .replace(/.js$/, '');
    unstyledFile = unstyledFile.replace(/Styled/g, '');

    const pathParts = unstyledFile.split(separator);

    const componentName = pathParts[pathParts.length - 1];
    const directoryName = pathParts[pathParts.length - 2];

    const componentNameReg = new RegExp(componentName, 'g');

    if (separator === '/') {
      unstyledFile = unstyledFile.replace(
        /packages\/mui-lab|packages\/mui-material/g,
        'packages/mui-base',
      );
    } else {
      unstyledFile = unstyledFile.replace(
        /packages\\mui-lab|packages\\mui-material/g,
        'packages\\mui-base',
      );
    }

    unstyledFile = unstyledFile.replace(componentNameReg, `${componentName}Unstyled`);

    if (directoryName !== componentName) {
      const directoryNameReg = new RegExp(directoryName, 'g');
      unstyledFile = unstyledFile.replace(directoryNameReg, `${directoryName}Unstyled`);
    }
  }

  return definitionFile ? `${unstyledFile}.d.ts` : `${unstyledFile}.js`;
}

export { getLineFeed, fixBabelGeneratorIssues, fixLineEndings, getUnstyledFilename };
