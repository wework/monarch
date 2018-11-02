module.exports = field => {
  if (field.type === 'Array' && !field.items) {
    console.log('Error: type Array needs an items field');
    return ``;
  }
  let newField = `
    .createField('${field.id}')
    .name('${field.name}')
    .type('${field.type}')`;

  if (field.required)
    newField += `
    .required(true)`;
  if (field.validations)
    newField += `
    .validations(${JSON.stringify(field.validations)})`;
  if (field.linkType)
    newField += `
    .linkType('${field.linkType}')`;
  if (field.type === 'Array' && field.items)
    newField += `
    .items(${JSON.stringify(field.items)})`;
  newField += `
  `;
  return newField;
};
