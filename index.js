#!/usr/bin/env node

import { program } from "commander";
import simpleGit from "simple-git";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import firstPush from "./commands/first-push.js";
import push from "./commands/push.js";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Initialize simple-git
const git = simpleGit();

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
// Parse command line arguments
program.parse(process.argv);