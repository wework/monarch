module.exports = (props, propName) => {
  const prop = props[propName];

  const { type, required, description, name } = prop;

  if(description.includes('@ignore-content-prop')) {
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
        { linkContentType: [ type.value ] },
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

    if((type.value.name === 'object' || type.value.name === 'shape') && description.includes('@asset')) {
      field.items = {
        type: 'Link',
        linkType: 'Asset',
      }
    }

    if(type.value.name === 'shape') {
      // TODO: what to do to support shape without description... do we create a new migration for these cases?
      // Object.keys(type.value.value).forEach(subPropName => {
      //   let item = buildObject(type.value.value, subPropName);
      //   field.items = item;
      // })
    }
  }
  return field;
}