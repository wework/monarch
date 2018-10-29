var createMigration = require('./createMigration.js');
var createFields = require('./createFields.js');
var createField = require('./createField.js');
var parseProps = require('./parseProps.js');
var buildObject = require('./buildObject.js');
var removeSpecialChars = require('./removeSpecialChars.js');
var getReferenceComponent = require('./getReferenceComponent.js');
var constants = require('./constants.js');

var isJSFile = fileName => (/\.js$/i).test(fileName);

module.exports = {
  createMigration,
  createFields,
  createField,
  parseProps,
  buildObject,
  isJSFile,
  removeSpecialChars,
  getReferenceComponent,
  ...constants,
};
