# monarch

Welcome to Monarch! We offer a node script to allow you to dynamically create [Contentful migration files](https://github.com/contentful/contentful-migration#createcontenttypeid-opts--contenttype) within your application.

[![npm version](https://badge.fury.io/js/%40wework%2Fmonarch.svg)](//npmjs.com/package/@wework/monarch)

## Getting Started

These docs reference the most current version. Since it is still in an alpha release, run the following to get the most recent release:

```
npm install -g @wework/monarch@next
```

Note: make sure [contentful-migrate](https://github.com/deluan/contentful-migrate) and [react-docgen](https://github.com/reactjs/react-docgen) are also installed globally. (This will be addressed in a later release)

## Parsing a React Component

Run:

```
monarch parse:react <path/to/component/file>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run, name spaced with the timestamp of creation.

For adding a content model description, use jsdoc comments above the component definition.

For ignoring proptypes or entire components, use jsdoc comment flag `@ignore-content-type`. [See example here](https://github.com/wework/monarch/blob/master/example/components/CrossSellGroupjsx)

Read about [contentful content types](https://github.com/contentful/contentful-migration#createfieldid-opts--field).

### Proptype specs:

| Proptype                  | Contentful type               | jsdoc flag required | Notes                          |
| ------------------------- | ----------------------------- | ------------------- | ------------------------------ |
| `string`                  | `Symbol`                      |                     |                                |
| `node`                    | `Symbol`                      |                     |                                |
| `oneOf`                   | `Symbol` w/ predefined values |                     |                                |
| `number`                  | `Number`                      |                     |                                |
| `bool`                    | `Boolean`                     |                     |                                |
| `arrayOf`                 | `Array`                       |                     | only supports `Link` types     |
| `object`                  | `Link` to asset               | `@asset`            |                                |
| `object`                  | `Link`                        |                     |                                |
| `shape`                   | `Link` to asset               | `@asset`            |                                |
| `shape`                   | `Link`                        |                     |                                |
| `func`                    | `null`                        |                     | ignored by default             |
| `instanceOf`              | `null`                        |                     | ignored by default             |
| prop name starts with `_` | `null`                        |                     | ignored by default (ex. `_id`) |

### Reference validators:

We recommend using AirBnb's [`airbnb-prop-types`](https://github.com/airbnb/prop-types) for custom proptype validations, we support the following:

| Validator             | Contentful type    | Notes                     |
| --------------------- | ------------------ | ------------------------- |
| `childrenOfType()`    | `Link`             | to reference              |
| `childrenOfType()`    | `Array` of `Link`s | needs `@array` jsdoc flag |
| `componentWithName()` | `Link`             | to reference              |
| `componentWithName()` | `Array` of `Link`s | needs `@array` jsdoc flag |

used like so:

```js
ParentComponent.propTypes = {
  children: childrenOfType(Component),
  otherThing: componentWithName('OtherComponent'),
  /** @array */
  allThings: componentWithName('SingleComponent')
};
```

## Parsing a raw object

If you'd rather translate a raw object ([example of structure here](https://github.com/wework/monarch/blob/master/example/dummy_data/index.js)) into a migration file, run:

```
monarch parse:raw <path/to/object/file>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run, name spaced with the timestamp of creation.

## Running the migration files

Once you have the files generated, you are ready to push them up to Contentful!

1.  Make sure your Contentful space has been initialized with a Migration content model. If you need to initialize a space, use command [`ctf-migrate init`](https://www.npmjs.com/package/contentful-migrate#init)

2.  Once initialized, run the migrations with commands [`ctf-migrate up`](https://www.npmjs.com/package/contentful-migrate#up) to create the model & [`ctf-migrate down`](https://www.npmjs.com/package/contentful-migrate#down) to delete it.

## Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md).

## The future

- support other front-end frameworks
