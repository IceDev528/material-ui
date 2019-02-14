// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js

import util from 'util';
import childProcess from 'child_process';

const execFileAsync = util.promisify(childProcess.execFile);

async function exec(command, args) {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };

  const results = await execFileAsync(command, args, options);
  return results.stdout;
}

async function execGitCmd(args) {
  const gitResults = await exec('git', args);
  return gitResults
    .trim()
    .toString()
    .split('\n');
}

async function listChangedFiles() {
  const mergeBase = await execGitCmd(['rev-parse', 'origin/next']);
  const gitDiff = await execGitCmd(['diff', '--name-only', mergeBase]);
  const gitLs = await execGitCmd(['ls-files', '--others', '--exclude-standard']);
  return new Set([...gitDiff, ...gitLs]);
}

export default listChangedFiles;
