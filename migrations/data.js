
module.exports.up = function(migration) {
  const component = migration.createContentType('component')
  component
    .name('Component')
    .description('Component to test')
  component
    .createField('contentTitle')
    .name('Content Title')
    .type('Symbol')
  component
    .createField('shortText')
    .name('Short Text')
    .type('Symbol')
    .required(true)
  component
    .createField('shortTextWithValidations')
    .name('Short Text with Validations')
    .type('Symbol')
    .validations([{"unique":true},{"regexp":{"pattern":"^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$"}}])
  component
    .createField('decimalNumber')
    .name('Decimal Number')
    .type('Number')
  component
    .createField('boolean')
    .name('Boolean Value')
    .type('Boolean')
  component
    .createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')
  component
    .createField('reference')
    .name('Reference')
    .type('Link')
    .validations([{"linkContentType":["someReference"]}])
    .linkType('Entry')
  

module.exports.down = migration => migration.deleteContentType(component);
