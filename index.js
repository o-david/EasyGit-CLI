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
              return "Repository URL cannot be empty";
            }
            return true;
          },
        },
      ])
       .then(({ repo }) => repo);
    }

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
    }
    
    try {
      await git.branch(["-M", "main"]);
      console.log("Successfully changed branch to main.");
    } catch (err) {
      console.error("Error changing branch to main:", err);
    }

    const remoteName = "origin";
    const remoteUrl = repo;
    console.log(remoteUrl);

    try {
      await git.addRemote(remoteName, remoteUrl);
      console.log(`Added remote origin "${remoteName}" with URL "${remoteUrl}"`);
    } catch (err) {
      console.error(`Error adding remote origin:`, err);
      return;
    }

    try {
      await git.push("origin", "main", ["-u"]);
      console.log("Changes pushed successfully to remote repository.");
    } catch (err) {
      console.error("Error pushing changes to remote repository:", err);
    }
  });


// Parse command line arguments
program.parse(process.argv);