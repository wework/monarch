module.exports = field => {
  let newField = `
    .createField('${field.id}')
    .name('${field.name}')
    .type('${field.type}')`;

  if(field.required) newField += `
    .required(true)`;
  if(field.validations) newField += `
    .validations(${JSON.stringify(field.validations)})`;
  if(field.linkType) newField += `
    .linkType('${field.linkType}')`;
  newField += `
  `;
  return newField;
};
