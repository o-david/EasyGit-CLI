import inquirer from "inquirer";
import git from "../utils/git.js";

const firstPush = async (repo) => {
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
  console.log(repo);

  try {
    await git.init();
    console.log("Initialized empty Git repository.");
  } catch (err) {
    console.error("Error initializing Git repository:", err);
    return;
  }

  try {
    await git.add(".");
    console.log("File(s) added to staging area.");
  } catch (err) {
    console.error("Error adding files:", err);
    return;
  }

  try {
    await git.commit(["initial Commit"]);
    console.log("Successfully commited");
  } catch (err) {
    console.error("Error commiting:", err);
    return;
  }

  try {
    await git.branch(["-M", "main"]);
    console.log("Successfully changed branch to main.");
  } catch (err) {
    console.error("Error changing branch to main:", err);
    return;
  }

  // Check for existing remote origin
  let existingRemote;
  try {
    existingRemote = await git.remote(["-v"]); // Get verbose remote information
  } catch (err) {
    // Ignore error if there's no remote yet (assuming `git remote -v` fails)
    console.log("No existing remote found. Creating new remote...");
  }

  const remoteName = "origin";
  const remoteUrl = repo;

  if (!existingRemote) {
    try {
      await git.addRemote(remoteName, remoteUrl);
      console.log(
        `Added remote origin "${remoteName}" with URL "${remoteUrl}"`
      );
    } catch (err) {
      console.error(`Error adding remote origin:`, err);
      return;
    }
  } else {
    console.log("Using existing remote origin:", existingRemote);
  }

  try {
    await git.push("origin", "main", ["-u"]);
    console.log("Changes pushed successfully to remote repository.");
  } catch (err) {
    console.error("Error pushing changes to remote repository:", err);
    return;
  }
};

export default firstPush;
