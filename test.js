#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import simpleGit from "simple-git";

// Initialize simple-git
const git = simpleGit();

// Command to add files to staging area
program
  .command("first-push [repo]")
  .description("Add file(s) to the staging area")
  .action(async (repo) => {
    if (!repo) {
      repo = await inquirer.prompt([
        {
          type: "input",
          name: "repo",
          message: "Enter the repository you wish to push to",
          validate: (input) => {
            if (input.trim() === "") {
              return "Commit message cannot be empty";
            }
            return true;
          },
        },
      ]);
    }
    await git.init((err) => {
      if (err) {
        console.error("Error initializing Git repository:", err);
        return;
      }
      console.log("Initialized empty Git repository:");
    });
    await git.add(".", (err) => {
      if (err) {
        console.error("Error adding file:", err);
        return;
      }
      console.log("File(s) added to staging area");
    });
    await git
      .branch(["-M", "main"])
      .then(() => {
        console.log("Successfully changed branch to main");
      })
      .catch((err) => {
        console.error("Error changing branch to main:", err);
      });
    await git
      .addRemote("origin", repo)
      .then(() => {
        console.log(
          `Added remote origin "${remoteName}" with URL "${remoteUrl}"`
        );
      })
      .catch((err) => {
        console.error(`Error adding remote origin:`, err);
        return false
      });
    await git
      .push("origin", "main", ["-u"])
      .then(() => {
        console.log("Changes pushed successfully to remote repository");
      })
      .catch((err) => {
        console.error("Error pushing changes to remote repository:", err);
      });
  });

// Command to commit changes
program
  .command("commit <message>")
  .description("Commit changes")
  .action((message) => {
    git.commit(message, (err) => {
      if (err) {
        console.error("Error committing changes:", err);
        return;
      }
      console.log("Changes committed successfully");
    });
  });

// Command to push changes
program
  .command("push")
  .description("Push changes to remote repository")
  .action(() => {
    git.push((err) => {
      if (err) {
        console.error("Error pushing changes:", err);
        return;
      }
      console.log("Changes pushed successfully");
    });
  });

// Parse command line arguments
program.parse(process.argv);

// // Command to push changes
// program
//   .command("push")
//   .description("Push changes to remote repository")
//   .action(() => {
//     git.push((err) => {
//       if (err) {
//         console.error("Error pushing changes:", err);
//         return;
//       }
//       console.log("Changes pushed successfully.");
//     });
//   });

// // Command to commit changes
// program
//   .command("commit <message>")
//   .description("Commit changes")
//   .action((message) => {
//     git.commit(message, (err) => {
//       if (err) {
//         console.error("Error committing changes:", err);
//         return;
//       }
//       console.log("Changes committed successfully.");
//     });
//   });
