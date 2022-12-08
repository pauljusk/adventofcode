const events = require("events");
const fs = require("fs");
const readline = require("readline");

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity,
    });

    // Part 1
    // const treeVals = {};
    // let rowNr = -1;
    // let maxTop = [];
    // let count = 0;
    // rl.on("line", (line) => {
    //   rowNr++;
    //   let maxLeft = -1;
    //   treeVals[rowNr] = {};
    //   for (let i = 0; i < line.length; i++) {
    //     if (maxTop[i] == undefined) maxTop[i] = -1;
    //     let isVisible = false;
    //     if (maxLeft < line[i]) {
    //       maxLeft = line[i];
    //       // count++;
    //       isVisible = true;
    //     }

    //     if (maxTop[i] < line[i]) {
    //       maxTop[i] = line[i];
    //       // count++;
    //       isVisible = true;
    //     }

    //     if (isVisible) count++;
    //     const tempVal = {
    //       value: line[i],
    //       isVisible,
    //     };
    //     treeVals[rowNr][i] = tempVal;
    //   }

    // });

    // await events.once(rl, "close");
    // let maxBottom = [];

    // const rowCount = Object.keys(treeVals).length -1;
    // const colCount = Object.keys(treeVals["0"]).length -1;
    // for (let i = rowCount; i > 0; i--) {
    //   let maxRight = -1;
    //   for (let j = colCount; j > 0; j--) {
    //     if (maxBottom[j] == undefined) maxBottom[j] = -1;

    //     const { value, isVisible } = treeVals[i][j];
    //     let isVisible2 = false;
    //     if (maxRight < value) {
    //       maxRight = value;
    //       isVisible2 = true;
    //     }

    //     if (maxBottom[j] < value) {
    //       maxBottom[j] = value;
    //       isVisible2 = true;
    //     }

    //     if (isVisible2 && !isVisible) count++;
    //   }
    // }

    // console.log(`count: ${count}`);

    // Part 2
    const treeVals = {};
    let rowNr = -1;
    let count = 0;
    rl.on("line", (line) => {
      rowNr++;
      treeVals[rowNr] = {};

      for (let i = 0; i < line.length; i++) {
        const value = line[i];
        let leftVal = 0;
        for (let j = i - 1; j >= 0; j--) {
          if (value > line[j]) leftVal++;
          else if (value != undefined) {
            leftVal++;
            break;
          } else break;
        }

        let topVal = 0;
        for (let j = rowNr - 1; j >= 0; j--) {
          if (value > treeVals[j][i].value) topVal++;
          else if (value != undefined) {
            topVal++;
            break;
          } else break;
        }

        const tempVal = {
          value: line[i],
          leftVal,
          topVal,
        };
        treeVals[rowNr][i] = tempVal;
      }
    });

    await events.once(rl, "close");
    let maxBottom = [];
    let maxTotalScore = 0;
    const rowCount = Object.keys(treeVals).length - 1;
    const colCount = Object.keys(treeVals["0"]).length - 1;
    for (let i = rowCount; i > 0; i--) {
      let maxRight = -1;
      for (let j = colCount; j > 0; j--) {
        const { value, isVisible, leftVal, topVal } = treeVals[i][j];
        let righttVal = 0;
        for (let k = j + 1; k <= colCount; k++) {
          const tempVal = treeVals[i][k].value;
          if (value > tempVal) righttVal++;
          else if (value != undefined) {
            righttVal++;
            break;
          } else break;
        }
        treeVals[i][j]["righttVal"] = righttVal;

        let bottomVal = 0;
        for (let k = i + 1; k <= rowCount; k++) {
          const tempVal = treeVals[k][j].value;
          if (value > tempVal) bottomVal++;
          else if (value != undefined) {
            bottomVal++;
            break;
          } else break;
        }

        treeVals[i][j]["bottomVal"] = bottomVal;

        const totalScore = bottomVal * righttVal * topVal * leftVal;
        if (totalScore > maxTotalScore) maxTotalScore = totalScore;
        treeVals[i][j]["totalScore"] = totalScore;
      }
    }

    // console.log(`treeVals: ${treeVals}`);
    // console.log(treeVals);
    // console.log(treeVals[1][2]);
    console.log('maxTotalScore',maxTotalScore);
  } catch (err) {
    console.error(err);
  }
})();
