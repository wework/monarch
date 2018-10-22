var { parseProps } = require('./util/');
var { createMigration } = require('./util/');

var fs = require ('fs');
var path = require('path');
var { exec } = require ('child_process');

exec(`node ./node_modules/.bin/react-docgen ${process.argv[2]} --pretty`, async (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log('ctf-migrate error:', err);
    return;
  }

  // Success!
  console.log('react-docgen', stdout);

  var object = await parseProps(JSON.parse(stdout));

  exec(`node ./node_modules/.bin/ctf-migrate create ${object.content_type} -c ${object.content_type}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log('ctf-migrate error:', err);
      return;
    }

    // Success!
    console.log(stdout);

    const fileName = stdout.split('/')[stdout.split('/').length - 1].trim();

    fs.writeFile(`./migrations/${object.content_type}/${fileName}`, createMigration(object), function(err) {
      if(err) {
          return console.log('fs error:', err);
      }

      console.log("The file was updated!");
    });
  });
});


