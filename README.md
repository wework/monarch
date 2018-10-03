# monarch
Welcome to Monarch! We offer a node script to allow you to dynamically create Contentful migration files within your application.

Currently supports [contentful content types](https://www.contentful.com/developers/docs/concepts/data-model/):
- Symbol (short text)
- Link (references or assets)
- Number (decimal number)
- Boolean

Also supports:
- Validations array
- Required
- linkType

We are not quite ready to be used in production, but in the meantime...
Test it out locally (be sure to `yarn` or `npm install` before doing anything):
```
git clone git@github.com:wework/monarch.git
```

To create and update the migration file, simply run the node script `migrate.js` with one argument:
```
node migrate.js <content type> <data file name>
```

Check out migrations directory and see that the file has been created. If you run this script multiple times, you will see a new file for each time it is run.

Run the migration in your application:
```
ctf-migrate up <file name> -t <Contentful access-key> -s <space id> -e <environment id> -c <content type>
```

The future:
- export custom validators
  - Entry linkType validator (based on child components component)
