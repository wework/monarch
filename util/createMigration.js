var createFields = require('./createFields.js');

// contentful-migrate (up & down)
// TODO: support contentful-cli (non up & down)
// TODO: contentTitle - disable in response
module.exports = component => `
module.exports.up = function(migration) {
  const ${component.content_type} = migration.createContentType('${component.content_type}')
  ${component.content_type}
    .name('${component.name}')
    .description('${component.description}')
  ${component.content_type}
    .createField('contentTitle')
    .name('Content Title')
    .type('Symbol')
  ${createFields(component)}
}

module.exports.down = migration => migration.deleteContentType('${component.content_type}');
`;
