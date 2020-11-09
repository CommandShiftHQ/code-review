const exec = require("child_process").execSync;

const getCommitToSplit = () => {
  /* find last commit by the author */
  const commits = exec("git log --pretty=format:'%H %ad %ae' --date=short")
    .toString()
    .split("\n")
    .map((line) => {
      // '22671a828aada72f0645029af5f6f0adce8f81c2 2019-10-26 (username)',
      const [hash, date, user] = line.split(" ");
      return { hash, date, user };
    });

  const mostRecentCommit = commits[0];
  const lastAuthor = mostRecentCommit.user;

  for (let i = 0; i < commits.length; i++) {
    if (commits[i].user !== lastAuthor) {
      return commits[i];
    }
  }

  const firstCommit = commits[commits.length - 1];
  return firstCommit;
};

const checkout = (name, newBranch = false) => {
  if (newBranch) {
    exec(`git checkout -b ${name}`);
  } else {
    exec(`git checkout ${name}`);
  }
};

reset = (hash) => {
  exec(`git reset --hard ${hash}`);
};

pushMaster = (hash, mainOrMaster) => {
  exec(`git push --force origin ${hash}:${mainOrMaster}`);
};

push = () => {
  exec(`git push -u origin code-review`);
};

getMainOrMaster = () => {
  if (exec("git branch -a").toString().includes("master")){
    return "master";
  } else {
    return "main";
  }
}

constructNewPRUrl = (mainOrMaster) => {
  const res = exec(`git config --get remote.origin.url`).toString();
  // git@github.com:ersel/music-library-api-mysql.git
  const [host, branch] = res.split("/");

  // host = git@github.com:ersel
  const [hostname, username] = host.split(":");

  // branch = music-library-api-mysql.git
  const [repo, gitSuffix] = branch.split(".");
  return `https://github.com/${username}/${repo}/compare/${mainOrMaster}...${username}:code-review?expand=1`;
};



module.exports = {
  getCommitToSplit,
  checkout,
  reset,
  pushMaster,
  push,
  constructNewPRUrl,
  getMainOrMaster
};
