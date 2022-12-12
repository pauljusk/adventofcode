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
    // let sum = 0
    // let sumObj = {}
    // let cycle = 1;
    // let x = 1;
    // let values = {};
    // rl.on("line", (line) => {
    //   const lineArr = line.split(" ");
    //   if (lineArr[0] == "noop") cycle++;
    //   else {
    //     cycle += 2;
    //     x += Number(lineArr[1]);
    //   }
    //   values[cycle] = x;
    // });

    // await events.once(rl, "close");

    // for(let i = 20; i <= 220; i+=40){
    //   let index = (values[i] != undefined)? i : i-1
    //   const cycleVal = values[index]
    //   sum+=cycleVal*i
    //   sumObj[i]=cycleVal*i
    //   console.log('values[index]',values[index]);
    // }
    // console.log(sum);
    // console.log(sumObj);

    // Part 2
    let cycle = 1;
    let x = 1;
    let results = "";
    rl.on("line", (line) => {
      const lineArr = line.split(" ");

      if (cycle >= x && cycle <= x + 2) results += "#";
      else results += ".";

      cycle++;
      if (cycle>40) cycle = 1
      if (lineArr[0] == "addx") {
        if (cycle  >= x && cycle <= x + 2) results += "#";
        else results += ".";
        cycle++
        if (cycle>40) cycle = 1
        x += Number(lineArr[1]);
      }

    });

    await events.once(rl, "close");

    console.log("results", results);
    console.log(results.match(/.{1,40}/g))

    // R E H P R L U B
    //  console.log(values);
  } catch (err) {
    console.error(err);
  }
})();


