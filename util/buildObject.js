const removeSpecialChars = require('./removeSpecialChars.js');
const getReferenceComponent = require('./getReferenceComponent.js');
const { VALIDATE_ALL, CHILD_TYPE, CUSTOM_TYPE, IS_REQUIRED, IGNORE, ARRAY, ASSET, ITEMS } = require('./constants.js');

const caseObjectOrShape = description => {
  if (description.includes(ASSET)) {
    return {
      type: 'Link',
      linkType: 'Asset'
    };
  }

  return {
    type: 'Link',
    linkType: 'Entry'
  };
};

const mapTypeForFieldValues = (type, description = '') => {
  const typeOfProp = type && type.name;
  switch (typeOfProp) {
    case 'func':
      return null;
    case 'instanceOf':
      return null;
    case 'string':
      return {
        type: 'Symbol'
      };
    case 'node':
      return {
        type: 'Symbol'
      };
    case 'bool':
      return {
        type: 'Boolean'
      };
    case 'number':
      return {
        type: 'Number'
      };
    case 'enum':
      const values = type.value.map(each => each.value.replace(/["']/g, ''));

      return {
        type: 'Symbol',
        validations: [{ in: values }]
      };
    case 'custom':
      if(type.raw.includes(CUSTOM_TYPE) || type.raw.includes(CHILD_TYPE)) {
        if(description.includes(ARRAY)) {
          return {
            type: 'Array',
            items: {},
            ...(type.raw.includes(IS_REQUIRED) && { required: true })
          };
        }

        const reference = getReferenceComponent(type) || getReferenceComponent(type, CHILD_TYPE);
        return {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            { linkContentType: [ reference ] },
          ],
          ...(description !== ITEMS && type.raw.includes(IS_REQUIRED) && { required: true })
        };
      }

      return null;
    case 'object':
      return caseObjectOrShape(description);
    case 'shape':
      return caseObjectOrShape(description);
    case 'arrayOf':
      return {
        type: 'Array',
        items: {}
      };
    default:
      return null;
  }
};

module.exports = (props, propName) => {
  const prop = props[propName];

  let { type, required, description, name } = prop;

  description = removeSpecialChars(description);

  if (description.includes(IGNORE)) {
    return null;
  }

  const typeOfProp = (type && type.name) || name;

  let field = mapTypeForFieldValues(type, description);

  if (!field) {
    return null;
  }

  field = {
    id: propName,
    name: propName, // TODO: name this something better (potentially something with spaces)
    ...field,
    ...(required && { required: true })
  };

  if(typeOfProp === 'arrayOf' || (typeOfProp === 'custom' && description.includes(ARRAY))) {
    if(typeOfProp === 'custom') {
      field.items = mapTypeForFieldValues(type, ITEMS)
    }

    if (type.value && (type.value.name === 'object' || type.value.name === 'shape')) {
      field.items = mapTypeForFieldValues(type.value, description);
    }
  }

  return field;
};
