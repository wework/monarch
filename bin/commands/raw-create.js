#!/usr/bin/env node

exports.command = 'parse:raw [file]';

exports.desc =
  'Create Contentful migration file from raw object file';

exports.builder = (yargs) => {
  yargs
    .positional('file', {
      describe: 'Required file path to object',
      type: 'string'
    })
};

const runMigrate = require('../../lib/migrate.js');

exports.handler = async (args) => {
  const { file } = args;

  runMigrate(file);
};
