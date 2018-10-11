const { createMigration, createFields, createField } = require('../util/');

const dummyField = {
  id: 'dummy',
  name: 'Freshest Field Name',
  type: 'Symbol',
};

describe('#createField', () => {
  test('short text field', () => {
    expect(createField(dummyField).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${dummyField.type}')`.replace(/\s/g, ''))
  });

  test('short text field with required', () => {
    expect(createField({...dummyField, required: true}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${dummyField.type}').required(true)`.replace(/\s/g, ''))
  })

  test('short text field with validations', () => {
    const validations = [{ unique: true }];
    expect(createField({...dummyField, validations}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${dummyField.type}').validations(${JSON.stringify(validations)})`.replace(/\s/g, ''))
  })

  test('Reference field', () => {
    const type = 'Link';
    const linkType = 'Entry';
    const validations = [{ linkContentType: [ 'refOne', 'refTwo' ] }];
    expect(createField({...dummyField, type, linkType, validations}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${type}').validations(${JSON.stringify(validations)}).linkType('${linkType}')`.replace(/\s/g, ''))
  })

  test('Array field with items', () => {
    const type = 'Array';
    const items = {
      type: 'Symbol',
    };
    expect(createField({...dummyField, type, items}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${type}').items(${JSON.stringify(items)})`.replace(/\s/g, ''))
  })

  test('Array field with no items', () => {
    const type = 'Array';
    expect(createField({...dummyField, type}).replace(/\s/g, '')).toBe(``)
  })

  test('Asset field', () => {
    const type = 'Link';
    const linkType = 'Asset';
    expect(createField({...dummyField, type, linkType}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${type}').linkType('${linkType}')`.replace(/\s/g, ''))
  })

  test('Boolean field', () => {
    const type = 'Boolean';
    expect(createField({...dummyField, type}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${type}')`.replace(/\s/g, ''))
  })

  test('Number field', () => {
    const type = 'Number';
    expect(createField({...dummyField, type}).replace(/\s/g, '')).toBe(
      `.createField('${dummyField.id}').name('${dummyField.name}').type('${type}')`.replace(/\s/g, ''))
  })
});

const dummyFieldTwo = {
  id: 'dummyFieldTwo',
  name: 'Dummy field two',
  type: 'Symbol',
  required: true,
}

const dummyComponent = {
  content_type: 'dummyContentType',
  name: 'Dummy Component',
  description: 'Some description',
  fields: [ dummyField, dummyFieldTwo ]
}

describe('#createFields', () => {
  test('returns all fields with appended contentType', async () => {
    expect(createFields(dummyComponent).replace(/\s/g, '')).toBe(`
      ${dummyComponent.content_type}.createField('${dummyField.id}').name('${dummyField.name}').type('${dummyField.type}')
      ${dummyComponent.content_type}.createField('${dummyFieldTwo.id}').name('${dummyFieldTwo.name}').type('${dummyFieldTwo.type}').required(true)`.replace(/\s/g, ''));
  })
});

describe('#createMigration', () => {
  test('returns full migration', () => {
    expect(createMigration(dummyComponent).replace(/\s/g, '')).toBe(`
      module.exports.up = function (migration) {
        const ${dummyComponent.content_type}=migration.createContentType('${dummyComponent.content_type}')
        ${dummyComponent.content_type}
          .name('${dummyComponent.name}')
          .description('${dummyComponent.description}')
        ${dummyComponent.content_type}
          .createField('contentTitle')
          .name('ContentTitle')
          .type('Symbol')
        ${dummyComponent.content_type}
          .createField('${dummyField.id}')
          .name('${dummyField.name}')
          .type('${dummyField.type}')
        ${dummyComponent.content_type}
          .createField('${dummyFieldTwo.id}')
          .name('${dummyFieldTwo.name}')
          .type('${dummyFieldTwo.type}')
          .required(true)}
      module.exports.down = migration => migration.deleteContentType('${dummyComponent.content_type}');
      `.replace(/\s/g, ''))
  })
})
