import fs from "node:fs";
import path from "node:path";
import globalModules from "global-modules";
import reservedNames, { commands } from "../utils/reservedNames.js";
import inquirer from "inquirer";

// Define the path to the config file
const configFile = path.join(globalModules, "easygit-cli/utils/config.json");

// Function to read the config file and return its contents as a JSON object
const getConfig = async () => {
  const data = await fs.promises.readFile(configFile, "utf-8");
  return JSON.parse(data);
};

// Function to add a new alias to the config file
const addAlias = async (alias, command) => {
  // Get the current config
  const config = await getConfig();
  
  try {
    // If alias or command is not provided, prompt the user to enter them
    if (!command ||!alias) {
      const { alias, command } = await inquirer.prompt([
        {
          type: "input",
          name: "alias",
          message: "Enter the alias you want to use",
          // Validate the alias input
          validate: (input) => {
            if (input.trim() === "") {
              return "Alias name cannot be empty";
            }
            if (reservedNames.includes(input)) {
              return `Cannot use already existing alias Name or reserved name ${input} as Alias \n Here is a list of reserved names: ${reservedNames}`;
            }
            return true;
          },
        },
        {
          type: "input",
          name: "command",
          message: "Enter the command its for",
          // Validate the command input
          validate: (input) => {
            if (input.trim() === "") {
              return "Command cannot be empty";
            }
            if (!(commands.includes(input))) {
              return `Command ${input} does not exist\n Here is a list of commands: ${commands}`;
            }
            return true;
          },
        },
      ]);
      
      // Add the new alias to the config
      config.aliases = [...config.aliases, { command, alias, desc: `(alias) for ${command} command` }];
      await fs.promises.writeFile(configFile, JSON.stringify(config), "utf-8");
    } else {
      // If alias or command is provided, validate them
      if (reservedNames.includes(alias)) {
        console.log(`Cannot use already existing alias Name or reserved name ${input} as Alias \n Here is a list of reserved names: ${reservedNames}`);
        return;
      }
      if (!(commands.includes(alias))) {
        console.log(`Command ${input} does not exist\n Here is a list of commands: ${commands}`);
        return;
      }
      
      // Add the new alias to the config
      config.aliases = [...config.aliases, { command, alias, desc: `(alias) for ${command} command` }];
      await fs.promises.writeFile(configFile, JSON.stringify(config), "utf-8");
    }
  } catch (err) {
    console.error(`Error adding alias: ${err}`);
  }
};

export default addAlias;