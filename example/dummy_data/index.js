module.exports = {
  content_type: 'component20181011',
  name: 'Component',
  description: 'Component to test',
  fields: [
    {
      id: 'shortText',
      name: 'Short Text',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'shortTextWithValidations',
      name: 'Short Text with Validations',
      type: 'Symbol',
      validations: [
        { unique: true },
        { regexp: { pattern: "^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$" } },
      ]
    },
    {
      id: 'decimalNumber',
      name: 'Decimal Number',
      type: 'Number',
    },
    {
      id: 'boolean',
      name: 'Boolean Value',
      type: 'Boolean',
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      linkType: 'Asset',
    },
    {
      id: 'reference',
      name: 'Reference',
      type: 'Link',
      linkType: 'Entry',
      validations: [
        { linkContentType: [ 'faqs' ] }
      ]
    },
    {
      id: 'referenceMany',
      name: 'Reference',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          { linkContentType: [ 'faqs' ] },
        ],
      }
    }
  ]
}
