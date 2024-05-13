import { spawn, exec } from "child_process"; // Required for checking global config

export const setGlobalConfig = async (key, value) => {
    return new Promise((resolve, reject) => {
      const process = spawn("git", ["config", "--global", key, value]);
      process.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Failed to set ${key} in global Git configuration`));
        }
      });
    });
  };

export const getGlobalConfig = (key) => {
    return new Promise((resolve, reject) => {
      exec(`git config ${key}`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout.trim());
      });
    });
  };