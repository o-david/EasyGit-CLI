import git from '../utils/git.js';
import inquirer from "inquirer";

async function push(commitMessage) {
    if (!commitMessage) {
        commitMessage = await inquirer
        .prompt([
            {
              type: "input",
              name: "repo",
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
      console.log(commitMessage);
    try {
        await git.add(".");
        console.log("File(s) added to staging area.");
      } catch (err) {
        console.error("Error adding files:", err);
        return;
      }
      try {
        await git.commit([commitMessage]);
        console.log("Successfully commited");
      } catch (err) {
        console.error("Error commiting:", err);
        return;
      }
      try {
        await git.push();
        console.log("Changes pushed successfully to remote repository.");
      } catch (err) {
        console.error("Error pushing changes to remote repository:", err);
        return;
      }
}

export default push;
