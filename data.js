module.exports = {
  content_type: 'author',
  name: 'Author',
  description: 'Author of a blog post',
  fields: [
    {
      id: 'fullName',
      name: 'Full Name',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      type: 'Symbol',
      required: true,
      validations: [
        { unique: true },
        { regexp: { pattern: "^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$" } },
      ]
    }
  ]
}