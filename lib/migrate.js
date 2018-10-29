const {createMigration, isJSFile} = require('../util/');

const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const {promisify} = require('util');

const promisifyExec = promisify(exec);
const promisifyWriteFile = promisify(fs.writeFile);

module.exports = async (filePath) => {
  const component = require(path.resolve(filePath));

  try {
    const {stdout: ctfMigrateOut} = promisifyExec(`ctf-migrate create ${component.content_type} -c ${component.content_type}`);

    // Success!
    console.log(ctfMigrateOut);

    const fileName = ctfMigrateOut.split('/')[ctfMigrateOut.split('/').length - 1].trim();

    if (isJSFile(fileName)) {
      try {
        await promisifyWriteFile(`./migrations/${component.content_type}/${fileName}`, createMigration(component));
        console.log("Done!");
      } catch (err) {
        return console.log('fs error:', err);
      }
    } else {
      console.log('Invalid file name', fileName);
    }
  } catch (err) {
    // node couldn't execute the command
    console.log('ctf-migrate error:', err);
  }
};
