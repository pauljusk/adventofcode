
const events = require('events');
const fs = require('fs');
const readline = require('readline');

const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

// console.log(1)
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity
    });


    // Part 1
    // let score = 0
    // rl.on('line', (line) => {
    //   var middle = Math.floor(line.length / 2);
    //   var first = [...new Set(line.substring(0, middle))];
    //   var second = [...new Set(line.substring(middle))];
    //   let [item] = first.filter(e => second.find(e2 => e == e2))
    //   score += alphaVal(item)
    //   if (item.toUpperCase() === item) score += 26
    // });

    // await events.once(rl, 'close');
    // console.log(`score: ${score}`);

    // Part 2
    let score = 0
    let group = []
    rl.on('line', (line) => {
      group.push([...new Set(line)])
      if (group.length == 3) {

        let [item] = group[0].filter(e => group[1].find(e2 => e == e2) && group[2].find(e2 => e == e2))
        score += alphaVal(item)
        if (item.toUpperCase() === item) score += 26

        group = []
      }
    });

    await events.once(rl, 'close');
    console.log(`score: ${score}`);

  } catch (err) {
    console.error(err);
  }
})();
