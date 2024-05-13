#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import simpleGit from "simple-git";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import firstPush from "./commands/first-push.js";
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
  .command("push")
  .description("For adding, commiting and pushing changes")
  .action(async () => {
      try {
          await git.reset(['--']);
          console.log('All changes unstaged successfully');
        } catch (err) {
            console.error('Error unstaging changes:', err);
            return;
        }
        
      try {
        const diff = await git.diff();
      const status = await git.status();
      const newFiles = status.not_added;
      let prompt;
      if (diff || newFiles.length) {
        prompt = diff
          ? newFiles.length
            ? `generate a commit message for this diff:${diff} and these new files:${newFiles}. Your response should be an object with the keys of subject and body only` //prompt for diff and newFiles
            : `generate a commit message for this diff:${diff}. Your response should be an object with the keys of subject and body only` //prompt for diff alone
            : `generate a commit message for these new files:${newFiles}your response should be an object with the keys of subject and body only`; //prompt for newFiles alone
        const commitMessage = await model
        .generateContent(prompt)
        .then((result) => {
            console.log(result.response.text());
            const response = JSON.parse(result.response.text().replace('```', '').replace('json', '').replace('```', '')); // Assuming JSON format
            const subject = response.subject;
            const body = response.body;
            const msg = {
                subject: subject,
                body: body,
            };
        return msg
        })
        .catch((err) => {
          console.error("Error generating commit message:", err);
          return;
        //   console.error("Prompt used:", prompt);
        });
        try {
            await git.add(".");
            console.log("File(s) added to staging area.");
          } catch (err) {
            console.error("Error adding files:", err);
            return;
          }
          try {
            await git.commit([`${commitMessage.subject}`, `${commitMessage.body}`]);
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
      else {
        return console.log("there are no changes to be commited");
      }

        
      } catch (error) {
        
      }
    
  });
// Parse command line arguments
program.parse(process.argv);