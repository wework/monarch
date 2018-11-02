const createField = require('./createField.js');

module.exports = component => {
  if (!component.fields) {
    console.log('No fields added');
    return;
  }

  let val = ``;
  component.fields.forEach(field => {
    val += `${component.content_type}`;
    val += createField(field);
  });
  return val;
};
