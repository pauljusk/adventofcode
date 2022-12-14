const events = require("events");
const fs = require("fs");
const readline = require("readline");

let dataObj = {};
let divisor = 1;
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity,
    });

    let monkeyName = "";
    let counter = -1;
    // let divisor = 1
    rl.on("line", (line) => {
      counter++;

      switch (counter % 7) {
        case 0:
          monkeyName = Math.ceil(counter / 7);
          dataObj[monkeyName] = { timesInspected: 0 };
          break;
        case 1:
          dataObj[monkeyName]["items"] = line.substring(18).split(", ");
          break;
        case 2:
          dataObj[monkeyName]["operation"] = line.substring(19);
          break;
        case 3:
          const lineVal = Number(line.substring(21))
          dataObj[monkeyName]["test"] = line.substring(21);
          divisor *= lineVal
          break;
        case 4:
          dataObj[monkeyName]["testTrue"] = line.substring(29);
          break;
        case 5:
          dataObj[monkeyName]["testFalse"] = line.substring(30);
          break;
        case 6:
          break;
      }
    });

    await events.once(rl, "close");

    // console.log(dataObj);
    for (let i = 0; i < 10000; i++) processRound();
    // for (let i = 0; i < 20; i++) processRound();
    const testArr = Object.values(dataObj)
      .map((e) => e.timesInspected)
      .sort((a, b) => b - a);
    console.log(testArr[0] * testArr[1]);
  } catch (err) {
    console.error(err);
  }
})();


// const divideBy3 = (val) => Math.floor(Number(val) / 4);
const divideBy3 = (val) => (Number(val) % divisor);
// const divideBy3 = (val) => Number(val);
const calculateVal = (operation, val) =>
  divideBy3(eval(operation.replaceAll("old", val)));

const processRound = () => {
  const numberOfMonkeys = Object.keys(dataObj).length;
  for (let i = 0; i < numberOfMonkeys; i++) {
    const selectedMonky = dataObj[i];
    selectedMonky.items.forEach((element) => {
      const newVal = calculateVal(selectedMonky.operation, element);
      const monkeyToPass =
        newVal % selectedMonky.test == 0
          ? selectedMonky.testTrue
          : selectedMonky.testFalse;


      dataObj[monkeyToPass].items.push(newVal);
      selectedMonky.timesInspected++;
    });
    dataObj[i].items = [];
  }
};


