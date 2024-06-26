import { execSync } from "child_process";
import ora from "ora";
import chalk from "chalk";

// Function to get the installed version of a package
const getInstalledVersion = (packageName) => {
  try {
    // Executes npm list command to get the installed version of the package
    const installedVersion = execSync(
      `npm list -g ${packageName} --depth=0`
    ).toString();
    // Extracts the version number from the command output using regex
    const versionMatch = installedVersion.match(
      new RegExp(`${packageName}@([\\d.]+)`)
    );
    // Returns the version number if matched, else returns null
    return versionMatch ? versionMatch[1] : null;
  } catch (error) {
    // Logs an error message if there is an issue fetching the installed version
    console.error(`Error fetching installed version: ${error.message}`);
    return null;
  }
};

// Function to get the latest version of a package
const getLatestVersion = (packageName, timeout = 5000) => {
  const spinner = ora("Checking Latest Version").start();
  try {
    const latestVersion = execSync(`npm view -g ${packageName} version`, {
      timeout,
    })
      .toString()
      .trim();
    spinner.stop();
    return latestVersion;
    // Returns the latest version number
  } catch (error) {
    spinner.stop();
    return null;
  }
};

// Function to update the version of the package if necessary
export const updateVersion = () => {
  const packageName = "easygit-cli";
  const installedVersion = getInstalledVersion(packageName);
  const latestVersion = getLatestVersion(packageName);

  // Checks if both installed and latest versions are retrieved
  if (installedVersion && latestVersion) {
    // Compares the installed and latest versions
    if (installedVersion !== latestVersion) {
      try {
        // Creates and starts a spinner for the update process
        const spinner = ora("Updating easygit-cli version").start();
        // Executes npm update command to update the package
        execSync(`npm update -g ${packageName}`).toString();
        // Stops the spinner with a success message
        spinner.succeed(chalk.green("Updated Easygit"));
      } catch (err) {
        // Logs an error message if there is an issue during the update process
        console.error(
          "Error updating package, Please check your network connection and try again."
        );
        return;
      }
    }
  }
};
