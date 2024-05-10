import { program } from "commander";
import inquirer from "inquirer";
import simpleGit from "simple-git";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Initialize simple-git
const git = simpleGit();

export const generateCommitMessage = async()=>{
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
        model
        .generateContent(prompt)
        .then((result) => {
            const response = JSON.parse(result.response.text().replace('```', '').replace('json', '').replace('```', '')); // Assuming JSON format
            const subject = response.subject;
            const body = response.body;
            const commitMessage = {
                subject: subject,
                body: body,
            };
            return commitMessage
        })
        .catch((err) => {
          console.error("Error generating commit message:", err);
        //   console.error("Prompt used:", prompt);
        });
      } 
      else {
        return console.log("there are no changes to be commited");
      }


}