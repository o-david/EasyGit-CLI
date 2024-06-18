#!/usr/bin/env node
import { program } from "commander";
import firstPush from "./commands/first-push.js";
import push from "./commands/push.js";
import config from "./commands/config.js";
import revert from "./commands/revert.js";
import fs from "node:fs";
import path from "node:path";
import globalModules from "global-modules";
import addAlias from "./commands/add-alias.js";

// Define the path to the config file
const configFile = path.join(globalModules, "easygit-cli/utils/config.json");

// Read the config file and parse its contents
const data = fs.readFileSync(`${configFile}`, "utf-8");
const aliases = JSON.parse(data).aliases;

const commandActions = {
  "first-push": firstPush,
  push,
  config,
  revert,
};

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
  .command("add-alias [alias] [command]")
  .description("For setting or retrieving global username and email")
  .action(addAlias);

program
  .command("revert")
  .description(
    "This command will find the commit hash of the previous commit, reset the local repository to that commit, and force push the changes to the remote repository on GitHub."
  )
  .action(revert);

aliases.map((element) => {
  program
    .command(
      element.command === "push"
      ? `${element.alias} [commitMessage]`
      : element.command === "first-push"
      ? `${element.alias} [repo]`
      : `${element.alias}`
    )
    .description(element.desc)
    .action(commandActions[element.command]);
});

// Parse command line arguments
program.parse(process.argv);
