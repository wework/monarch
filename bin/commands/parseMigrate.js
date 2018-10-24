#!/usr/bin/env node

exports.command = 'parseMigrate [file]';

exports.desc =
  'Parse React component to create dynamic Contentful migration file';

exports.builder = (yargs) => {
  yargs
    .positional('file', {
      describe: 'Required path to React component',
      type: 'string'
    })
};

const runParseMigrate = require('../../lib/parseMigrate.js');

exports.handler = async (args) => {
  const { file } = args;

  runParseMigrate(file);
};
