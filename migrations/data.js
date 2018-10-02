
module.exports.up = function(migration) {
  const author = migration.createContentType('author')
  author
    .name('Author')
    .description('Author of a blog post')
  author
    .createField('fullName')
    .name('Full Name')
    .type('Symbol')
    .required(true)
  author
    .createField('twitter')
    .name('Twitter')
    .type('Symbol')
    .required(true)
    .validations([{"unique":true},{"regexp":{"pattern":"^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$"}}])
  

module.exports.down = migration => migration.deleteContentType(author);
