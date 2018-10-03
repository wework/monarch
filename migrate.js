var { createMigration } = require('./util/');

var fs = require ('fs');
var path = require('path');
var { exec } = require ('child_process');

// TODO: this should be able to be passed in or this will be grabbed in Phase 2
var component = require(path.resolve(__dirname, process.argv[3]));

exec(`ctf-migrate create ${process.argv[2]} -c ${process.argv[2]}`, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log('ctf-migrate error:', err);
    return;
  }

  // Success!
  console.log(stdout);

  const fileName = stdout.split('/')[stdout.split('/').length - 1].trim();

  fs.writeFile(`./migrations/${process.argv[2]}/${fileName}`, createMigration(component), function(err) {
    if(err) {
        return console.log('fs error:', err);
    }

    console.log("The file was updated!");
  });
});

