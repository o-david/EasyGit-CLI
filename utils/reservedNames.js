// Import required modules
import fs from "node:fs"; // Node's file system module
import path from "node:path"; // Node's path module
import globalModules from "global-modules"; // Global modules directory

// Define the path to the config file
// We're storing our config file in the global-modules directory
const configFile = path.join(globalModules, "easygit-cli/utils/config.json");

// Read the config file and parse its contents
const getConfig = () => {
  try {
    // Read the file synchronously and return its contents as a string
    const data = fs.readFileSync(configFile, "utf-8");
    // Parse the JSON data and return the resulting object
    return JSON.parse(data);
  } catch (error) {
    // If there's an error reading the file, log it to the console
    console.error(`Error reading config file: ${error.message}`);
  }
};

// Define an array of reserved command names
export const commands = ["push", "first-push", "config", "revert"];

// Initialize an array to store reserved names
let reservedNames = [...commands];

// Read the config file and extract aliases
const config = getConfig();
if (config && config.aliases) {
  // Add each alias to the reservedNames array
  config.aliases.forEach((alias) => {
    reservedNames.push(alias.alias);
  });
}

// Export the reservedNames array as the default export
export default reservedNames;