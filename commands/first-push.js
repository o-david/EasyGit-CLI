import inquirer from "inquirer";
import git from "../utils/git.js";
import ora from "ora";
import chalk from "chalk";


const firstPush = async (repo) => {
  // If no repository URL is provided, prompt the user to enter one
  if (!repo) {
    repo = await inquirer
      .prompt([
        {
          type: "input",
          name: "repo",
          message: "Enter the repository you wish to push to",
          validate: (input) => {
            if (input.trim() === "") {
              return "Repository URL cannot be empty";
            }
            return true;
          },
        },
      ])
      .then(({ repo }) => repo);
  }
  console.log(`Using repository URL: ${repo}`);

  try {
    // Initialize an empty Git repository
    await git.init();
    console.log("Initialized empty Git repository.");
  } catch (err) {
    console.error("Error initializing Git repository:", err);
    return;
  }

  try {
    // Add all files in the current directory to the staging area
    await git.add(".");
    console.log("File(s) added to staging area.");
  } catch (err) {
    console.error("Error adding files:", err);
    return;
  }

  try {
    // Create an initial commit with a default message
    await git.commit(["initial Commit"]);
    console.log("Successfully committed");
  } catch (err) {
    console.error("Error committing:", err);
    return;
  }

  try {
    // Set the default branch to "main"
    await git.branch(["-M", "main"]);
    console.log("Successfully changed branch to main.");
  } catch (err) {
    console.error("Error changing branch to main:", err);
    return;
  }

  // Check if a remote origin already exists
  let existingRemote;
  try {
    // Get verbose remote information to check if a remote origin exists
    existingRemote = await git.remote(["-v"]);
  } catch (err) {
    // Ignore error if there's no remote yet (assuming `git remote -v` fails)
    console.log("No existing remote found. Creating new remote...");
  }

  const remoteName = "origin";
  const remoteUrl = repo;

  if (!existingRemote) {
    try {
      // Add a new remote origin with the provided repository URL
      await git.addRemote(remoteName, remoteUrl);
      console.log(`Added remote origin "${remoteName}" with URL "${remoteUrl}"`);
    } catch (err) {
      console.error(`Error adding remote origin:`, err);
      return;
    }
  } else {
    console.log("Using existing remote origin:", existingRemote);
  }

  // Push the changes to the remote repository and set the upstream tracking information
  try {
    const spinner = ora('Pushing changes to remote repository...').start(); // Start the spinner      
    await git.push("origin", "main", ["-u"]);
    spinner.succeed(chalk.green("Done! Changes pushed successfully to remote repository."));
  } catch (err) {
    console.error("Error pushing changes to remote repository:", err);
    return;
  }
};

export default firstPush;