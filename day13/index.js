
const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity
    });
    
    let score = 0
    let scorePart2 = 0

    rl.on('line', (line) => {
      // score += scoreMap[line]
      // scorePart2 += scoreMapPart2[line]
    });

    await events.once(rl, 'close');


    console.log(`score: ${score}`);
    console.log(`scorePart2: ${scorePart2}`);

  } catch (err) {
    console.error(err);
  }
})();
