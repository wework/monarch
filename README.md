# monarch
Welcome to Monarch! We offer a node script to allow you to dynamically create Contentful migration files within your application.

[See it in action](https://cl.ly/b6b7795fcdb3)

## React Component specs
|Proptype      | Contentful type     | Notes                                  |
|--------------|---------------------|----------------------------------------|
|`string`      | `Symbol`            |                                        |
|`number`      | `Number`            |                                        |
|`bool`        | `Boolean`           |                                        |
|`arrayOf`     | `Array`             | supports Links to references or assets |
|`object`      | `Link` to asset     | only if jsdoc `@asset` flag added      |
|`shape`       | `Link` to asset     | only if jsdoc `@asset` flag added      |
|`instanceOf`  | `Link` to reference |                                        |

For ignoring proptypes, use jsdoc comment flag `@ignore-content-prop`

Read more about [contentful content types](https://github.com/contentful/contentful-migration#createfieldid-opts--field).

## Getting Started
We are not quite ready to be used in production, but in the meantime...
Test it out locally (be sure to `yarn` or `npm install` before doing anything):
```
git clone git@github.com:wework/monarch.git
```

To create and update the migration file, simply run the node script `parseMigrate.js` with one argument:
```
node parseMigrate.js <path/to/component/file>
```
or use command script locally:
```
yarn parse:migrate <path/to/component/file>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run, name spaced with the timestamp of creation.

## Running the migration files
Once you have the files generated, you are ready to push them up to Contentful!

1. Make sure your Contentful space has been initialized with a Migration content model. If you need to initialize a space, use command [`ctf-migrate init`](https://www.npmjs.com/package/contentful-migrate#init)

2. Once initialized, run the migrations with commands [`ctf-migrate up`](https://www.npmjs.com/package/contentful-migrate#up) to create the model & [`ctf-migrate down`](https://www.npmjs.com/package/contentful-migrate#down) to delete it.

## The future
- support other front-end frameworks
- export custom validators
