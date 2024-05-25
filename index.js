#!/usr/bin/env node
import { program } from "commander";
import firstPush from "./commands/first-push.js";
import push from "./commands/push.js";
import config from "./commands/config.js";
import revert from "./commands/revert.js";

// Command to add files to staging area
program
  .command("first-push [repo]")
  .description(
    "Initialize git, add to staging area, commit and push to remote repo "
  )
  .action(firstPush);

program
  .command("push [commitMessage]")
  .description("For adding, commiting and pushing changes")
  .action(push);

program
  .command("config")
  .description("For setting or retrieving global username and email")
  .action(config);

program
  .command("revert")
  .description("This command will find the commit hash of the previous commit, reset the local repository to that commit, and force push the changes to the remote repository on GitHub.")
  .action(revert);

// Parse command line arguments
program.parse(process.argv);
