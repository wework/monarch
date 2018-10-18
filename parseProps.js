var { parseProps } = require('./util/');

var fs = require ('fs');
var path = require('path');
var { exec } = require ('child_process');

exec(`react-docgen ${process.argv[3]} --pretty`, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log('ctf-migrate error:', err);
    return;
  }

  // Success!
  console.log(stdout);

  fs.writeFile(`${process.argv[2]}.js`, parseProps(JSON.parse(stdout)), function(err) {
    if(err) {
        return console.log('fs error:', err);
    }

    console.log("The file was created!");
  });
});

