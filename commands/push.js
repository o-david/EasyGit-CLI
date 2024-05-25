// Import required modules
import git from "../utils/git.js";
import inquirer from "inquirer";

// Define the push function
const push = async (commitMessage) => {
  try {
    // Add a try-catch block around the entire function
    // If no commit message is provided, prompt the user for one
    if (!commitMessage) {
      commitMessage = await inquirer
        .prompt([
          {
            type: "input",
            name: "commitMessage",
            message: "Enter a commit message",
            validate: (input) => {
              if (input.trim() === "") {
                return "Repository URL cannot be empty";
              }
              return true;
            },
          },
        ])
        .then(({ commitMessage }) => commitMessage);
    }
    commitMessage = commitMessage.replaceAll(/'|"/g, "");

    // Add all files to the staging area
    try {
      await git.add("-A");
      console.log("File(s) added to staging area.");
    } catch (err) {
      console.error("Error adding files:", err);
      return;
    }

    // Commit the changes with the provided commit message
    try {
      await git.commit([commitMessage]);
      console.log("Successfully committed (" + commitMessage + ")");
    } catch (err) {
      console.error("Error committing:", err);
      return;
    }

    // Check if the local repository is up-to-date with the remote repository
    try {
      const status = await git.status();
      if (status.behind > 0) {
        console.error(
          "Local repository is not up-to-date with the remote repository. Please pull the latest changes before pushing."
        );
        return;
      }
    } catch (err) {
      console.error("Error checking git status:", err);
      return;
    }

    // Push the changes to the remote repository
    try {
      console.log("Pushing changes to remote repository...");
      await git.push();
      console.log("Changes pushed successfully to remote repository.");
    } catch (err) {
      console.error("Error pushing changes to remote repository:", err);
      return;
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
};

// Export the push function
export default push;
