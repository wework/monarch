const removeSpecialChars = require('./removeSpecialChars.js');
const buildObject = require('./buildObject.js');
const { IGNORE } = require('./constants.js');

module.exports = component => {
  let { description, displayName, props } = component;

  // ignore components that do not define proptypes
  // ignore components that are specified as IGNORE
  if (!props || description.includes(IGNORE)) {
    return {
      error: `ignored component: ${displayName} because it is ${
        !props ? `without proptypes defined` : `using ${IGNORE} flag`
      }`
    };
  }

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
