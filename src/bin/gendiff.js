#!/usr/bin/env node

import program from 'commander';
import getDiff from '../utils/getDiff';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
const [path1, path2] = program.args;

const run = () => {
  if (!path1 || !path2) {
    return 'No paths';
  }
  return JSON.stringify(getDiff(path1, path2), null, ' ');
};

const result = run();
console.log(result);
