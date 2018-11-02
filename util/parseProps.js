const removeSpecialChars = require('./removeSpecialChars.js');
const buildObject = require('./buildObject.js');

module.exports = component => {
  let { description, displayName, props } = component;
  description = removeSpecialChars(description);

  const namesOfProps = Object.keys(props);
  const obj = {
    name: displayName,
    content_type: displayName,
    description,
    fields: []
  };
  namesOfProps.forEach(propName => {
    if (propName.startsWith('_')) {
      return;
    }

    let field = buildObject(props, propName);
    if (field) {
      obj.fields.push(field);
    }
  });

  return obj;
};
