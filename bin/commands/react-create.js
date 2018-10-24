#!/usr/bin/env node

exports.command = 'parse:react [file]';

exports.desc = 'Create migration file from React component file';

exports.builder = (yargs) => {
  yargs
    .positional('file', {
      describe: 'Required file path to React component',
      type: 'string'
    })
};

const runParseMigrate = require('../../lib/parseMigrate.js');

exports.handler = async (args) => {
  const { file } = args;

  runParseMigrate(file);
};
