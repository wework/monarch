var { createMigration } = require('./util/');

var fs = require ('fs');
var path = require('path');
var { exec } = require ('child_process');

var component = require(path.resolve(__dirname, process.argv[3]));
console.log('component', component)

exec(`node ./node_modules/.bin/ctf-migrate create ${process.argv[2]} -c ${process.argv[2]}`, (err, stdout, stderr) => {
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

