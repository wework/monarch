const { parseProps, createMigration, isJSFile } = require('../util/');

const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const promisifyExec = promisify(exec);
const promisifyWriteFile = promisify(fs.writeFile);

module.exports = async filePath => {
  try {
    const { stdout: docgenOut } = await promisifyExec(`react-docgen ${filePath} --pretty`);

    // Success!
    const object = await parseProps(JSON.parse(docgenOut));

    console.log('🎉 completed: parsed React component', filePath);

    const { stdout: ctfMigrateOut } = await promisifyExec(
      `ctf-migrate create ${object.content_type} -c ${object.content_type}`
    );

    // Success!
    const fileName = ctfMigrateOut.split('/')[ctfMigrateOut.split('/').length - 1].trim();

    console.log('🎉 completed: created migration', fileName);

    if (isJSFile(fileName)) {
      try {
        await promisifyWriteFile(`./migrations/${object.content_type}/${fileName}`, createMigration(object));
        console.log('All done!');
      } catch (error) {
        return console.log('fs error:', err);
      }
    } else {
      console.log('Not a valid fileName', fileName);
    }
  } catch (err) {
    // node couldn't execute the command
    console.log('migrate error:', err);
  }
};
