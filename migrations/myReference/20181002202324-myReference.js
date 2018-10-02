
module.exports.up = function(migration) {
  const myReference = migration.createContentType('myReference')
  myReference
    .name('My Reference')
    .description('Reference to test')
  myReference
    .createField('contentTitle')
    .name('Content Title')
    .type('Symbol')
  myReference
    .createField('refText')
    .name('Ref Text')
    .type('Symbol')
    .required(true)
  
}

module.exports.down = migration => migration.deleteContentType('myReference');
