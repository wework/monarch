var removeSpecialChars = require('./cleanup.js');
var buildObject = require('./buildObject.js');

module.exports = component => {
  var { description, displayName, props } = component;
  description = removeSpecialChars(description);

  var namesOfProps = Object.keys(props);
  const obj = {
    name: displayName,
    content_type: displayName,
    description,
    fields: []
  }
  namesOfProps.forEach(propName => {
    let field = buildObject(props, propName);
    if(field) {
      obj.fields.push(field);
    }
  })

  return obj;
};
