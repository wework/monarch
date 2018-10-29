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

For ignoring proptypes, use jsdoc comment flag [`@ignore-content-prop`](https://github.com/wework/monarch/blob/master/example/components/CrossSellGroup.jsx#L25)

Read about [contentful content types](https://github.com/contentful/contentful-migration#createfieldid-opts--field).

### Proptype specs:
|Proptype      | Contentful type     | jsdoc flag required | Notes                      |
|--------------|---------------------|---------------------|----------------------------|
|`string`      | `Symbol`            |                     |                            |
|`node`        | `Symbol`            |                     |                            |
|`number`      | `Number`            |                     |                            |
|`bool`        | `Boolean`           |                     |                            |
|`arrayOf`     | `Array`             |                     | only supports `Link` types |
|`object`      | `Link` to asset     | `@asset`            |                            |
|`object`      | `Link`              |                     |                            |
|`shape`       | `Link` to asset     | `@asset`            |                            |
|`shape`       | `Link`              |                     |                            |
|`func`        | none                |                     | ignored by default         |
|`instanceOf`  | none                |                     | ignored by default         |

### Custom proptype validators:
We offer a few custom proptype validators to use in your code base, in order to reference specific content models (see an [example here](https://github.com/wework/monarch/blob/master/example/components/CrossSellGroup.jsx)).

|Validator          | Contentful type     | Notes                       |
|-------------------|---------------------|-----------------------------|
|`childType()`      | `Link`              | to reference                |
|`customPropType()` | `Link`              | to reference                |
|`validateAll()`    | `Array` of `Link`s  | to reference                |

## Parsing a raw object
If you'd rather translate a raw object ([example of structure here](https://github.com/wework/monarch/blob/master/example/dummy_data/index.js)) into a migration file, run:

```
monarch parse:raw <path/to/object/file>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run, name spaced with the timestamp of creation.

## Running the migration files
Once you have the files generated, you are ready to push them up to Contentful!

1. Make sure your Contentful space has been initialized with a Migration content model. If you need to initialize a space, use command [`ctf-migrate init`](https://www.npmjs.com/package/contentful-migrate#init)

2. Once initialized, run the migrations with commands [`ctf-migrate up`](https://www.npmjs.com/package/contentful-migrate#up) to create the model & [`ctf-migrate down`](https://www.npmjs.com/package/contentful-migrate#down) to delete it.

## The future
- support other front-end frameworks
- export custom validators
