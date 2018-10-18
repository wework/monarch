const buildObject = (props, propName) => {
  const prop = props[propName];
  console.log('buildObject', prop);
  const { type, required, description, name } = prop;
  const typeOfProp = (type && type.name) || name;
  const field = {
    id: propName,
    name: propName, // TODO: name this something better
    ...(prop.required && { required: true }),
  };

  if(typeOfProp === 'string') {
    field.type = 'Symbol';
  }
  if(typeOfProp === 'bool') {
    field.type = 'Boolean';
  }
  if(typeOfProp === 'arrayOf') {
    field.type = 'Array';
    field.items = {};
    console.log('value', type.value);
    console.log('name', type.value.name);
    if(type.value.name === 'shape') {
      Object.keys(type.value.value).forEach(subPropName => {
        let item = buildObject(type.value.value, subPropName);
        field.items = item;
      })
    }
  }
  return field;
}

module.exports = component => {
  var { description, displayName, props } = component;
  var namesOfProps = Object.keys(props);
  const obj = {
    name: displayName,
    content_type: displayName,
    description,
    fields: []
  }
  namesOfProps.forEach(propName => {
    let field = buildObject(props, propName);
    obj.fields.push(field);
  })

  return obj;
};
