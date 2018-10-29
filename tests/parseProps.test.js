const { parseProps, buildObject, IGNORE, ASSET, VALIDATE_ALL, CUSTOM_TYPE, CHILD_TYPE, IS_REQUIRED } = require('../util/');

const string = {
  "headerText": {
    "type": {
      "name": "string"
    },
    "required": false,
    "description": ""
  },
}

const required = {
  "requiredText": {
    "type": {
      "name": "string"
    },
    "required": true,
    "description": ""
  },
}

const func = {
  "func": {
    "type": {
      "name": "func"
    },
    "required": true,
    "description": ""
  },
}

const node = {
  "node": {
    "type": {
      "name": "node"
    },
    "required": false,
    "description": ""
  },
}

const bool = {
  "centered": {
    "type": {
      "name": "bool"
    },
    "required": false,
    "description": ""
  },
}

const shape = {
  "shape": {
    "type": {
      "name": "shape",
      "value": {
        "key": {
          "name": "string",
          "required": false
        }
      }
    },
    "required": false,
    "description": ""
  },
}

const object = {
  "object": {
    "type": {
      "name": "object"
    },
    "required": false,
    "description": ""
  }
}

const instanceOf = {
  "crossSellCard": {
    "type": {
      "name": "instanceOf",
      "value": "CrossSellCard"
    },
    "required": false,
    "description": ""
  },
}

const ignored = {
  "__id": {
    "type": {
      "name": "string"
    },
    "required": false,
    "description": IGNORE
  },
}

const asset = {
  "image": {
    "type": {
      "name": "object"
    },
    "required": false,
    "description": ASSET
  },
}

const arrayOfAssets = {
  "images": {
    "type": {
      "name": "arrayOf",
      "value": {
        "name": "object"
      }
    },
    "required": false,
    "description": ASSET
  }
}

const childTypeRequired = {
  childTypeRequired: {
    type: { name: 'custom', raw: `${CHILD_TYPE}(CrossSellCard).${IS_REQUIRED}` },
    required: false,
    description: ''
  }
};

const childType = {
  childType: {
    type: { name: 'custom', raw: `${CHILD_TYPE}(CrossSellCard)` },
    required: false,
    description: ''
  }
};

const customTypeRequired = {
  customTypeRequired: {
    type: { name: 'custom', raw: `${CUSTOM_TYPE}(CrossSellCard).${IS_REQUIRED}` },
    required: false,
    description: ''
  }
};

const customType = {
  customType: {
    type: { name: 'custom', raw: `${CUSTOM_TYPE}(CrossSellCard)` },
    required: false,
    description: ''
  }
};

const validateAll = {
  validateAll: {
    type: { name: 'custom', raw: `${VALIDATE_ALL}(${CUSTOM_TYPE}(CrossSellCard))` },
    required: false,
    description: ''
  }
}

const validateAllRequired = {
  validateAllRequired: {
    type: { name: 'custom', raw: `${VALIDATE_ALL}(${CUSTOM_TYPE}(CrossSellCard)).${IS_REQUIRED}` },
    required: false,
    description: ''
  }
}

describe('#buildObject', () => {
  test('short text field', () => {
    expect(buildObject(string, 'headerText')).toEqual({
      id: 'headerText',
      name: 'headerText',
      type: 'Symbol',
    })
  });

  test('short text field from node', () => {
    expect(buildObject(node, 'node')).toEqual({
      id: 'node',
      name: 'node',
      type: 'Symbol',
    })
  });

  test('required text field', () => {
    expect(buildObject(required, 'requiredText')).toEqual({
      id: 'requiredText',
      name: 'requiredText',
      type: 'Symbol',
      required: true,
    })
  });

  test('function field', () => {
    expect(buildObject(func, 'func')).toEqual(null)
  });

  test('bool field', () => {
    expect(buildObject(bool, 'centered')).toEqual({
      id: 'centered',
      name: 'centered',
      type: 'Boolean',
    })
  });

  test('shape', () => {
    expect(buildObject(shape, 'shape')).toEqual({
      id: 'shape',
      name: 'shape',
      type: 'Link',
      linkType: 'Entry',
    })
  })

  test('object', () => {
    expect(buildObject(object, 'object')).toEqual({
      id: 'object',
      name: 'object',
      type: 'Link',
      linkType: 'Entry',
    })
  })

  test('arrayOfAssets field', () => {
    expect(buildObject(arrayOfAssets, 'images')).toEqual({
      id: 'images',
      name: 'images',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Asset',
      }
    })
  });

  test('asset field', () => {
    expect(buildObject(asset, 'image')).toEqual({
      id: 'image',
      name: 'image',
      type: 'Link',
      linkType: 'Asset',
    })
  });

  test('ignored field', () => {
    expect(buildObject(ignored, '__id')).toEqual(null)
  });

  test('instanceOf field', () => {
    expect(buildObject(instanceOf, 'crossSellCard')).toEqual(null)
  });

  describe('custom validators', () =>{
    test('childType', () => {
      expect(buildObject(childType, 'childType')).toEqual({
        id: 'childType',
        name: 'childType',
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'CrossSellCard' ] }
        ],
      })
    })

    test(`${CHILD_TYPE} required`, () => {
      expect(buildObject(childTypeRequired, 'childTypeRequired')).toEqual({
        id: 'childTypeRequired',
        name: 'childTypeRequired',
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'CrossSellCard' ] }
        ],
        required: true,
      })
    })

    test(CUSTOM_TYPE, () => {
      expect(buildObject(customType, 'customType')).toEqual({
        id: 'customType',
        name: 'customType',
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'CrossSellCard' ] }
        ],
      })
    })

    test(`${CUSTOM_TYPE} required`, () => {
      expect(buildObject(customTypeRequired, 'customTypeRequired')).toEqual({
        id: 'customTypeRequired',
        name: 'customTypeRequired',
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'CrossSellCard' ] }
        ],
        required: true,
      })
    })

    test(VALIDATE_ALL, () => {
      expect(buildObject(validateAll, 'validateAll')).toEqual({
        id: 'validateAll',
        name: 'validateAll',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            { linkContentType: [ 'CrossSellCard' ] },
          ],
        }
      })
    })

    test(`${VALIDATE_ALL} required`, () => {
      expect(buildObject(validateAllRequired, 'validateAllRequired')).toEqual({
        id: 'validateAllRequired',
        name: 'validateAllRequired',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            { linkContentType: [ 'CrossSellCard' ] },
          ],
        },
        required: true,
      })
    })
  })
});

const dummyComponent = {
  "description": "",
  "displayName": "CrossSellGroup",
  "methods": [],
  "props": {
    ...string,
    ...arrayOfAssets,
  }
};

describe('#parseProps', () => {
  test('parse component', () => {
    expect(parseProps(dummyComponent)).toEqual({
      content_type: dummyComponent.displayName,
      name: dummyComponent.displayName,
      description: '',
      fields: [
        {
          id: 'headerText',
          name: 'headerText',
          type: 'Symbol',
        },
        {
          id: 'images',
          name: 'images',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Asset',
          }
        }
      ]
    })
  })
})
