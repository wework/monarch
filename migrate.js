const createFields = (component) => {
  if(!component.fields) {
    console.log('No fields added')
    return
  }

  let val = ``;
  component.fields.forEach(field => {
    val += `${component.content_type}
    .createField('${field.id}')
    .name('${field.name}')
    .type('${field.type}')`

    if(field.required) val += `
    .required(true)`;
    if(field.validations) val += `
    .validations(${JSON.stringify(field.validations)})`;
    if(field.linkType) val += `
    .linkType('${field.linkType}')`;
    val += `
  `;
  })
  return val;
};

// contentful-migrate (up & down)
// TODO: support contentful-cli (non up & down)
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
}

module.exports.down = migration => migration.deleteContentType('${component.content_type}');
`;

var fs = require ('fs');
var { exec } = require ('child_process');

// TODO: this should be able to be passed in or this will be grabbed in Phase 2
var component = require ('./dummy_data');

exec(`ctf-migrate create ${process.argv[2]} -c ${process.argv[2]}`, async (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log('ctf-migrate error:', err);
    return;
  }

  // Success!
  console.log(stdout);

  const fileName = stdout.split('/')[stdout.split('/').length - 1].trim();

  fs.writeFile(`./migrations/${process.argv[2]}/${fileName}`, createMigration(component), function(err) {
    if(err) {
        return console.log('fs error:', err);
    }

    console.log("The file was updated!");
  });
});

