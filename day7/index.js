const events = require("events");
const fs = require("fs");
const readline = require("readline");

const commands = {
  $: {
    ls: {},
    cd: {},
  },
};

function Folder(parent, path) {
  this.parent = parent;
  this.value = 0;
  this.path = path;
  this.depth = depth;
  this.children = [];
}

const tree = {};
const treePaths = {};
let currentPath = "";

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      const lineArr = line.split(" ");
      if (lineArr[0] == "$") {
        if (lineArr[1] == "cd") {
          switch (lineArr[2]) {
            case "/":
              currentPath = "/root";
              break;
            case "..":
              arr = currentPath.split("/");
              arr.pop();
              currentPath = arr.join("/");
              break;
            default:
              currentPath += `/${lineArr[2]}`;
          }
          // console.log('currentPath',currentPath)
        }
      } else {
        if (!tree[currentPath])
          tree[currentPath] = { dir: [], files: [], fileSizeSum: 0 };
        if (lineArr[0] == "dir") {
          if (!tree[currentPath].dir.includes(`${currentPath}/${lineArr[1]}`))
            tree[currentPath].dir.push(`${currentPath}/${lineArr[1]}`);
        } else {
          if (!tree[currentPath].files.some((e) => e.name === lineArr[1])) {
            tree[currentPath].files.push({
              size: lineArr[0],
              name: lineArr[1],
            });
            tree[currentPath].fileSizeSum += Number(lineArr[0]);
          }
        }
      }
    });

    await events.once(rl, "close");

    const recursiveFileSizeSum = (tempTree) => {
      let retVal = Number(tempTree.fileSizeSum);
      if (tempTree.dir.length > 0) {
        tempTree.dir.forEach((e) => (retVal += recursiveFileSizeSum(tree[e])));
        return retVal;
      } else {
        return retVal;
      }
    };

    let returnSum = 0;
    for (const node in tree) {
      const folderSizeSum = recursiveFileSizeSum(tree[node]);
      tree[node].folderSizeSum = folderSizeSum;
      if (folderSizeSum < 100000) returnSum += Number(folderSizeSum);
    }
    let sizeToRemove = tree["/root"].folderSizeSum - 40000000;
    let returnMinSizeToRemove = tree["/root"].folderSizeSum;
    for (const node in tree) {
      if (
        tree[node].folderSizeSum > sizeToRemove &&
        tree[node].folderSizeSum < returnMinSizeToRemove
      )
        returnMinSizeToRemove = tree[node].folderSizeSum;
    }
    console.log("returnSum", returnSum);
    console.log("returnMinSizeToRemove", returnMinSizeToRemove);
    // console.log("sizeToRemove", sizeToRemove);
  } catch (err) {
    console.error(err);
  }
})();
