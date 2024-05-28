// Import required modules
import git from "../utils/git.js";
import inquirer from "inquirer";
import colors from "colors";
import fs from "node:fs";
import path from "node:path";
import globalModules from "global-modules";

// Define the path to the config file
const configFile = path.join(globalModules, "easygit-cli/utils/config.json");

// Read the config file and parse its contents
const data = fs.readFileSync(`${configFile}`, "utf-8");
const config = JSON.parse(data);

// Define the revert function
const revert = async () => {
  // Get the current branch
  let currentBranch;
  try {
    const branch = await git.branch();
    currentBranch = branch.current;
    console.log(`Current branch: ${currentBranch}`);
  } catch (error) {
    console.error('Failed to get current branch', error);
  }

  // Show a warning message if the user has not disabled it
  if (config.showResetMessage) {
    console.log(
      "WARNING: This script will find the commit hash of the previous commit, reset the local repository to that commit, and force push the changes to the remote repository on GitHub.".yellow +
        "\nBe careful when using --force, as it will overwrite the remote repository with your local repository." +
        "\nThis can cause issues if other people are also working on the repository."
    );

    // Ask the user if they want to proceed with the action
    const warn = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Do you want to proceed with this action?",
        default: false,
      },
      {
        type: "confirm",
        name: "showWarningAgain",
        message: "Show this warning next time?",
        default: true,
      },
    ]);

    // If the user does not want to proceed, cancel the action
    if (!warn.confirm) {
      console.log('Action cancelled.');
      return;
    }

    // If the user does not want to see the warning again, disable it
    if (!warn.showWarningAgain) {
      config.showResetMessage = false;
      fs.writeFileSync(configFile, JSON.stringify(config), "utf-8");
    }
  }

  // Perform the revert action
  try {
    // Get the commit hash of the previous commit
    await git.stash();
    const log = await git.log();
    const previousCommitHash = log.all[1].hash;

    // Reset the local repository to the previous commit
    await git.reset([previousCommitHash, '--soft']);
    await git.stash();

    // Force push the changes to the remote repository
    await git.push(['origin', currentBranch, '--force']);

    console.log(`Successfully reverted to commit ${log[0]}`);
  } catch (error) {
    console.error(error);
  }
};

// Export the revert function
export default revert;