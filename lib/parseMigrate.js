var { parseProps, createMigration } = require('../util/');

var fs = require ('fs');
var { exec } = require ('child_process');

module.exports = filePath => {
  exec(`react-docgen ${filePath} --pretty`, async (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log('react-docgen error:', err);
      return;
    }

    // Success!
    var object = await parseProps(JSON.parse(stdout));

    console.log('🎉 Parsed React component complete');

    exec(`ctf-migrate create ${object.content_type} -c ${object.content_type}`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log('ctf-migrate error:', err);
        return;
      }

      // Success!
      console.log(stdout);

      const fileName = stdout.split('/')[stdout.split('/').length - 1].trim();

      // TODO: verify fileName is correctly formatted
      fs.writeFile(`./migrations/${object.content_type}/${fileName}`, createMigration(object), function(err) {
        if(err) {
          return console.log('fs error:', err);
        }

        console.log("Done!");
      });
    });
  });
}


