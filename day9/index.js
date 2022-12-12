const events = require("events");
const fs = require("fs");
const readline = require("readline");

let positionMap = {
  xH: 0,
  yH: 0,
  xT: 0,
  yT: 0,
};

let pathMapCount = { "0_0": 1 };

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      const { moveX, moveY, steps } = headMoveDirection(line);
      for (let i = 0; i < steps; i++) {
        if (moveX > 0) positionMap["xH"]++;
        if (moveX < 0) positionMap["xH"]--;
        if (moveY > 0) positionMap["yH"]++;
        if (moveY < 0) positionMap["yH"]--;
        moveTail();
      }
    });

    await events.once(rl, "close");

    console.log("answer", Object.keys(pathMapCount).length);
  } catch (err) {
    console.error(err);
  }
})();

// Helper functions
function moveTail() {
  const { xH, yH, xT, yT } = positionMap;
  // console.log('positionMap',positionMap)
  let moveDirection = "";
  let moveValue = 0;

  if (xH > xT + 1) {
    moveDirection = "x";
    moveValue = 1;
  }
  if (xH < xT - 1) {
    moveDirection = "x";
    moveValue = -1;
  }

  if (yH > yT + 1) {
    moveDirection = "y";
    moveValue = 1;
  }
  if (yH < yT - 1) {
    moveDirection = "y";
    moveValue = -1;
  }

 if (moveValue != 0) {
    if (moveDirection == "x") {
      positionMap["xT"] += moveValue;
      if (yH > yT) {
        positionMap["yT"] += 1;
      } else if (yH < yT) {
        positionMap["yT"] -= 1;
      }
    }

    if (moveDirection == "y") {
      positionMap["yT"] += moveValue;
      if (xH > xT) {
        positionMap["xT"] += 1;
      } else if (xH < xT) {
        positionMap["xT"] -= 1;
      }
    }
   
    const pathLog = `${positionMap["xT"]}_${positionMap["yT"]}`;
    if (pathMapCount[pathLog] == undefined) pathMapCount[pathLog] = 1;
    else pathMapCount[pathLog] += 1;
  }
 
}

function setMoveValues() {}

function headMoveDirection(line) {
  let moveX = 0;
  let moveY = 0;
  const lineArr = line.split(" ");
  const steps = Number(lineArr[1]);
  switch (lineArr[0]) {
    case "R":
      moveX = 1;
      break;
    case "L":
      moveX = -1;
      break;
    case "U":
      moveY = -1;
      break;
    case "D":
      moveY = 1;
      break;
  }
  return { moveX, moveY, steps };
}


