const shelljs = require('shelljs');
const semver = require('semver');
const inquirer = require('inquirer');
const chalk = require('chalk');

const update = (installCommand, latestVersion, commandOptions) => {
  console.log(chalk.blue('Updating...'));
  if (shelljs.exec(installCommand, commandOptions).code <= 0) {
    console.log(chalk.green(`Successfully updated to version ${latestVersion}`));
  } else {
    console.log(chalk.red(`Failed to update to version ${latestVersion}`));
  }
};

module.exports = ({
    name,
    version,
    autoupdater: {
      updateMessage = 'Would you like to update now?',
      checkCommand = `npm show ${name} version`,
      installCommand = `npm install -g ${name}`,
      promptUser = true,
      commandOptions = { silent: true, timeout: 2000 }
    }
  }) => new Promise((resolve, reject) => {
    const result = shelljs.exec(checkCommand, commandOptions);

    if (!result || result.stderr) {
      reject(result ? result.stderr.trim() : 'Command did not complete');
      return;
    }

    const latestVersion = result.stdout.trim();

    if (semver.gt(latestVersion, version)) {
      console.log(chalk.yellow(`New version available: ${latestVersion}`));
      if (promptUser) {
        // If we should prompt
        inquirer.prompt({
          name: 'shouldUpdate',
          message: updateMessage,
          type: 'confirm',
          default: true
        }).then((answers) => {
          if (answers.shouldUpdate === true) {
            update(installCommand, latestVersion);
          }
          resolve(answers.shouldUpdate);
        }).catch(reject);
      } else {
        update(installCommand, latestVersion);
        resolve(true);
      }
    } else {
      resolve(false);
    }
  });
