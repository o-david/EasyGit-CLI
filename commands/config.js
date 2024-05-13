import inquirer from "inquirer";
import { getGlobalConfig, setGlobalConfig } from "../utils/globalConfig.js";

const config = async () => {
  let username;
  let email;
  try {
    username = await getGlobalConfig("user.name");
    email = await getGlobalConfig("user.email");
  } catch (err) {
    console.error(err);
  }
  if (!username || !email) {
    console.info("Your global Git username or email is not configured.");
    console.log("Would you like to set them now? (recommended)");

    const configureCredentials = await inquirer.prompt([
      {
        type: "confirm",
        name: "configure",
        message: "Configure username and email?",
        default: true,
      },
    ]);

    if (configureCredentials.configure) {
      const usernamePrompt = await inquirer.prompt([
        {
          type: "input",
          name: "username",
          message: "Enter your Git username:",
        },
      ]);
      const emailPrompt = await inquirer.prompt([
        {
          type: "input",
          name: "email",
          message: "Enter your Git email address:",
        },
    ]);
      await setGlobalConfig("user.name", usernamePrompt.username);
      await setGlobalConfig("user.email", emailPrompt.email);
      console.log("Username and email successfully configured globally.");
    }
  } else {
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
  }
};

export default config;
