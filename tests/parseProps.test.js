const { parseProps, buildObject } = require('../util/');

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

const bool = {
  "centered": {
    "type": {
      "name": "bool"
    },
    "required": false,
    "description": ""
  },
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

const arrayOfinstanceOf = {
  "crossSellCards": {
    "type": {
      "name": "arrayOf",
      "value": {
        "name": "instanceOf",
        "value": "CrossSellCard"
      }
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
    "description": "@ignore-content-prop"
  },
}

const asset = {
  "image": {
    "type": {
      "name": "object"
    },
    "required": false,
    "description": "@asset"
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
    "description": "@asset"
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

  test('required text field', () => {
    expect(buildObject(required, 'requiredText')).toEqual({
      id: 'requiredText',
      name: 'requiredText',
      type: 'Symbol',
      required: true,
    })
  });

  test('bool field', () => {
    expect(buildObject(bool, 'centered')).toEqual({
      id: 'centered',
      name: 'centered',
      type: 'Boolean',
    })
  });

  test('instanceOf field', () => {
    expect(buildObject(instanceOf, 'crossSellCard')).toEqual({
      id: 'crossSellCard',
      name: 'crossSellCard',
      type: 'Link',
      linkType: 'Entry',
      validations: [
        { linkContentType: [ 'CrossSellCard' ] }
      ]
    })
  });

  test('arrayOfinstanceOf field', () => {
    expect(buildObject(arrayOfinstanceOf, 'crossSellCards')).toEqual({
      id: 'crossSellCards',
      name: 'crossSellCards',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'CrossSellCard' ] },
        ],
      }
    })
  });

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
