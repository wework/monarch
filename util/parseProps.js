const buildObject = (props, propName) => {
  const prop = props[propName];
  console.log('buildObject', prop);
  const { type, required, description, name } = prop;

  if(description.includes('@ignore-content-type')) {
    return null;
  }

  const typeOfProp = (type && type.name) || name;
  let field = {
    id: propName,
    name: propName, // TODO: name this something better (potentially something with spaces)
    ...(prop.required && { required: true }),
  };

  if(typeOfProp === 'string') {
    field.type = 'Symbol';
  }
  if(typeOfProp === 'bool') {
    field.type = 'Boolean';
  }
  if(typeOfProp === 'number') {
    field.type = 'Number'
  }
  if(typeOfProp === 'instanceOf') {
    field = {
      ...field,
      type: 'Link',
      linkType: 'Entry',
      validations: [
        { linkContentType: [ type.value.value ] },
      ],
    }
  }
  if((typeOfProp === 'object' || typeOfProp === 'shape') && description.includes('@asset')) {
    field = {
      ...field,
      type: 'Link',
      linkType: 'Asset',
    }
  }
  if(typeOfProp === 'arrayOf') {
    field.type = 'Array';
    field.items = {};
    if(type.value.name === 'instanceOf') {
      field.items = {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ type.value.value ] },
        ],
      }
    }
    // TODO: what to do to support shape... do we create a new migration for these cases?
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
    if(field) {
      obj.fields.push(field);
    }
  })

  return obj;
};
