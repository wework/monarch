# monarch
Welcome to Monarch! We offer a node script to allow you to dynamically create Contentful migration files within your application.

Currently supports contentful content types:
- Symbol (short text)
- Link (references or assets)
- Number (decimal number)
- Boolean

Also supports:
- Validations array
- Required
- linkType

We are not quite ready to be used in production, but in the meantime...
Test it out locally:
```
git clone git@github.com:wework/monarch.git
```

From the command line, create the directory and migration file (ex. `20181002202324-myReference.js`):
```
ctf-migrate create <name> -c <content type>
```

To edit that file, run the node script `edit_file.js` with two arguments:
```
node edit_file.js <name> <file name created from ctf-migrate create>
```

Re-open the file, and see it has been updated.

Run the migration in your application:
```
ctf-migrate up <file name> -t <Contentful access-key> -s <space id> -e <environment id> -c <content type>
```

The future:
- Migration directory will live in your app's code base
