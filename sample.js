const createFields = (component) => {
  let val = ``;
  component.fields.forEach(each => {
    val += `${component.content_type}
    .createField('${each.id}')
    .name('${each.name}')
    .type('${each.type}')`

    if(each.required) val += `
    .required(true)`;
    if(each.validations) val += `
    .validations(${JSON.stringify(each.validations)})`;
    if(each.linkType) val += `
    .linkType('${each.linkType}')`;
    val += `
  `;
  })
  return val;
};

const createMigration = component => `
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

module.exports.down = migration => migration.deleteContentType(${component.content_type});
`;

var fs = require('fs');
var component = require('./data.js');

fs.writeFile(`./migrations/${process.argv[2]}`, createMigration(component), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
