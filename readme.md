# EastGit CLI

The EasyGit CLI is a simple command line interface for Git that automates the process of initializing a new Git repository, adding files to the staging area, committing changes, and pushing them to a remote repository. It is built using Node.js and the simple-git library. Additionally, the EasyGit CLI integrates with the Google Generative Language API to automatically generate commit messages based on the changes you've made to your code. This eliminates the need to manually craft commit messages, further streamlining your workflow.

## Installation
To install the EasyGit CLI, you will need to have Node.js installed on your computer. Once you have Node.js installed, you can install it by running the following command:
```bash
npm install -g easygit-cli
```
This will install the EasyGit CLI globally on your computer, allowing you to use it from any directory.

## Usage

## First Push Command
The `first-push` command initializes a new Git repository, adds all files to the staging area, commits them with the message "initial Commit", changes the branch to main, adds a remote origin, and pushes changes to the remote repository.

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
The `push` command adds, commits, and pushes changes to the remote repository. If there are changes in the working directory, it generates a commit message using AI and includes information about the diff and new files.

### Syntax
```bash
easygit-cli push
```

### Example
```bash
easygit-cli push
```

## Contributing
If you would like to contribute to the Git CLI, please fork the repository and submit a pull request. All contributions are welcome!

## License
The Git CLI is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact
If you have any questions or feedback, please feel free to contact me at okekedavid1333@gmail.com.
