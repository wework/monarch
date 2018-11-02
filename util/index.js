const createMigration = require('./createMigration.js');
const createFields = require('./createFields.js');
const createField = require('./createField.js');
const parseProps = require('./parseProps.js');
const buildObject = require('./buildObject.js');
const removeSpecialChars = require('./removeSpecialChars.js');
const getReferenceComponent = require('./getReferenceComponent.js');
const constants = require('./constants.js');

const isJSFile = fileName => /\.js$/i.test(fileName);

module.exports = {
  createMigration,
  createFields,
  createField,
  parseProps,
  buildObject,
  isJSFile,
  removeSpecialChars,
  getReferenceComponent,
  ...constants
};
