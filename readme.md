# EastGit CLI

```bash
npm install -g easygit-cli
```

The EasyGit CLI is a simple command line interface for Git that automates the process of initializing a new Git repository, adding files to the staging area, committing changes, and pushing them to a remote repository. It is built using Node.js and the simple-git library. Additionally, the EasyGit CLI integrates with the Google Generative Language API to automatically generate commit messages based on the changes you've made to your code. This eliminates the need to manually craft commit messages, further streamlining your workflow.

## Installation
To install the EasyGit CLI, you will need to have Node.js installed on your computer. Once you have Node.js installed, you can install it by running the following command:

```bash
npm install -g easygit-cli
```

This will install the EasyGit CLI globally on your computer, allowing you to use it from any directory.

### Enabling Scripts on Windows
If you are using Windows, you need to enable the execution of scripts in PowerShell

### HOW?

* Open PowerShell as Administrator.
* Run the following command to allow script execution:
```powershell
Set-ExecutionPolicy RemoteSigned
```

## Usage

## First Push Command
The first-push command initializes a new Git repository, stages all files, commits them with the message "Initial Commit", switches the branch to main, sets the remote origin (or uses the existing one), and pushes the changes to the remote repository.

### Syntax
```bash
easygit-cli first-push [repo]
```
* `repo`: Optional. The URL of the remote repository to push changes to. If not provided, the user will be prompted to enter the repository URL.

### Example
```bash
easygit-cli first-push https://github.com/username/repository.git
```

## Push Command
The `push` command stages changes, commits them with a provided commit message, and pushes the changes to the remote repository. You need to supply a commit message.


### Syntax
```bash
easygit-cli push [commitMessage]
```
* `commitMessage`: Optional. The commit message. If not provided, you will be prompted to enter a commit message.

### Example
```bash
easygit-cli push
```
## Config Command
The `config` command returns the global Git username and email if they are set. If they are not available, it prompts the user to enter them and sets the global configuration accordingly.

### Syntax
```bash
easygit-cli config
```

## Contributing
Contributions are welcome! Please follow these steps to contribute:

* Fork the repository.
* Create a new branch with a descriptive name.
* Make your changes and commit them with a clear message.
* Push your changes to your fork.
* Submit a pull request.

## License
The Git CLI is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact
If you have any questions or feedback, please feel free to contact me at okekedavid1333@gmail.com or send a dm on linkedIn: https://www.linkedin.com/in/obinna-okeke-0a7445173/.
