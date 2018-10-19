# monarch
Welcome to Monarch! We offer a node script to allow you to dynamically create Contentful migration files within your application.

Currently supports [contentful content types](https://github.com/contentful/contentful-migration#createfieldid-opts--field):
- Symbol (short text)
- Link (references or assets)
- Number (decimal number)
- Boolean
- Array (needs `items` object as well)

Also supports:
- Validations array
- Required
- linkType
- items (required, if `type` is `Array`)

## React Component specs
Proptype      | Contentful type     | Notes
---------------------------------------------
`string`      | `Symbol`            |
`number`      | `Number`            |
`bool`        | `Boolean`           |
`arrayOf`     | `Array`             | supports Links to references or assets
`object`      | `Link` to asset     | only if jsdoc `@asset` flag added
`shape`       | `Link` to asset     | only if jsdoc `@asset` flag added
`instanceOf`  | `Link` to reference |

For ignoring proptypes, use jsdoc comment flag `@ignore-content-prop`

## Getting Started
We are not quite ready to be used in production, but in the meantime...
Test it out locally (be sure to `yarn` or `npm install` before doing anything):
```
git clone git@github.com:wework/monarch.git
```

To create and update the migration file, simply run the node script `parseMigrate.js` with one argument:
```
node parseMigrate.js <react component filename>
```
or use npm script locally:
```
yarn parse:migrate <react component filename>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run, name spaced with the timestamp of creation.


Run the migrations in your application, using [`ctf-migrate`](https://www.npmjs.com/package/contentful-migrate#up). Example for running `up`, which creates the Contentful content model in your Contentful space:
```
  Usage: ctf-migrate up [filename] [options]

  Options:

    -t, --access-token [access-token]  CMA token, defaults to your environment variable CONTENTFUL_MANAGEMENT_ACCESS_TOKEN if empty
    -s, --space-id [space-id]          space id to use
    -e, --environment-id [env-id]      id of the environment within the space (default 'master')
    -c, --content-type [content-type]  one or more content type names to process
    -a, --all                          processes migrations for all content types
    -d, --dry-run                      only shows the plan, don't write anything to contentful. defaults to false
```

The future:
- support other front-end frameworks
- export custom validators
