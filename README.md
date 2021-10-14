# code-review

When students share a repository to be reviewed instead of a PR:

1. fork their repo under your personal github profile.
2. clone down your fork
3. run `npx mcrcode-review` from root
4. use the link given by the tool to create a PR to review

# How to replicate manually?
- git **clone your fork** of student repo
- Get the commit hash of the first commit on the repo using git history 
  `git rev-list --max-parents=0 HEAD`
- Whilst you are on the master or main branch: `git checkout -b code-review`
- Checkout master branch again `git checkout master # could be master or main`
- `git push origin COMMIT_HASH_FROM_STEP_2:master` 
- `git push -u origin code-review`
- You should be able to create a PR on student's github repo using the following url:

https://github.com/${yourGitHubUserName}/${repo}/compare/master...${yourGitHubUserName}:code-review?expand=1
