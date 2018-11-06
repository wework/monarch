const { parseProps, createMigration, isJSFile, IGNORE } = require('../util/');

const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const promisifyExec = promisify(exec);
const promisifyWriteFile = promisify(fs.writeFile);

module.exports = async filePath => {
  try {
    const { stdout: docgenOut } = await promisifyExec(
      `react-docgen ${filePath} --pretty --resolver findAllComponentDefinitions`
    );

    // Success!
    const docgenOutArray = JSON.parse(docgenOut);
    console.log('🎉 completed: parsed React component', filePath);

    // Loop over array of components and create migration for each
    docgenOutArray.forEach(async docgenOut => {
      const object = await parseProps(docgenOut);

      if (object.error) {
        console.error(object.error);
        return;
      }

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
          return console.error('fs error:', err);
        }
      } else {
        console.error('Not a valid fileName', fileName);
      }
    });
  } catch (err) {
    // node couldn't execute the command
    console.error('migrate error:', err);
  }
};
