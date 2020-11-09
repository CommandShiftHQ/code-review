const {
  getCommitToSplit,
  checkout,
  reset,
  push,
  pushMaster,
  constructNewPRUrl,
  getMainOrMaster 
} = require("./utils/gitUtils");

const mainOrMaster = getMainOrMaster();

const commitToSplit = getCommitToSplit();
console.log(
  `branching out from ${commitToSplit.hash} at ${commitToSplit.date}`
);
checkout("code-review", true);
checkout(`${mainOrMaster}`);
reset(commitToSplit.hash);
pushMaster(commitToSplit.hash, mainOrMaster);
push("code-review");
const url = constructNewPRUrl(mainOrMaster);
console.log("\033[31mUse the URL below to create a new PR\n");
console.log(url);
console.log("\x1b[0m");
