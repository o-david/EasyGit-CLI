# Git CLI

The Git CLI is a simple command line interface for Git that automates the process of initializing a new Git repository, adding files to the staging area, committing changes, and pushing them to a remote repository. It is built using Node.js and the simple-git library, which provides a simple and easy-to-use API for interacting with Git.

The Git CLI is designed to make it easy for developers to quickly create a new Git repository and push their changes to a remote repository, without having to remember all of the individual Git commands and options. It is especially useful for developers who are new to Git or who want to save time and effort when working with Git. The Git CLI is also open source, so it can be easily customized and extended to meet the specific needs of your project or workflow.

The Git CLI is a simple and easy-to-use tool that can help you save time and effort when working with Git. It automates the process of initializing a new Git repository, adding files to the staging area, committing changes, and pushing them to a remote repository, so you can focus on writing code and developing your project. Whether you are a seasoned Git user or just getting started, the Git CLI is a valuable tool that can help you be more productive and efficient.

## Installation
To install the Git CLI, you will need to have Node.js installed on your computer. Once you have Node.js installed, you can install the Git CLI by running the following command:
```bash
npm install -g git-cli
```
This will install the Git CLI globally on your computer, allowing you to use it from any directory.

## Usage

To use the Git CLI, you will need to navigate to the directory containing the files you want to add to the repository. Once you are in the correct directory, you can run the following command to initialize a new Git repository and push your changes to a remote repository:

```bash
git-cli first-push [repo]
```
Replace `[repo]` with the URL of the remote repository you want to push to. If you do not provide a repository URL, the Git CLI will prompt you to enter one.

The `first-push` command will initialize a new Git repository, add all files in the current directory to the staging area, commit the changes with the message "initial Commit", create a new branch named "main", add a remote named "origin" with the specified URL, and push the changes to the remote repository.

## Contributing
If you would like to contribute to the Git CLI, please fork the repository and submit a pull request. All contributions are welcome!

## License
The Git CLI is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact
If you have any questions or feedback, please feel free to contact me at okekedavid1333@gmail.com.
