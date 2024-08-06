// import git from "../utils/git.js";

// // Set your GitHub credentials
// const githubUsername = 'o-david';
// const githubPassword = 'Mr_davId@01';
// const repoName = 'new-repo';

// // Initialize a new Git repository
// git.init().then(() => {
//   // Create a new remote repository on GitHub
//   const githubApiUrl = 'https://api.github.com/repos';
//   const repoData = {
//     name: repoName,
//     description: 'My new repository',
//     private: false,
//   };

//   const auth = `Basic ${Buffer.from(`${githubUsername}:${githubPassword}`).toString('base64')}`;
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: auth,
//   };

//   fetch(githubApiUrl, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(repoData),
//   })
//    .then(response => response.json())
//    .then(data => {
//     //   const repoUrl = data.html_url;
//       console.log(data);
//     //   console.log(`Repository created: ${repoUrl}`);

//       // Add the remote repository to the local Git config
//     //   git.addRemote('origin', repoUrl).then(() => {
//     //     console.log('Remote repository added to local Git config');
//     //   });
//     })
//    .catch(error => {
//       console.error('Error creating repository:', error);
//     });
// });

import git from "../utils/git.js";

// Replace with your desired repo name and access details
const repoName = "your-repo-name";
const username = "your_username";
const password = "your_password"; // Not recommended for security reasons

// Construct the SSH URL with username for secure authentication (replace with appropriate URL)
const gitUrl = `ssh://${username}@github.com/${username}/${repoName}.git`;

(async () => {

  try {
   
    // Add a remote named "origin" pointing to the git URL
    await git.addRemote('origin2', gitUrl);
    console.log("Remote repository created and pushed successfully!");
  } catch (err) {
    console.error("Error creating remote repo:", err);
  }
})();
