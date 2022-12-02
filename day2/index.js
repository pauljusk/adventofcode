
const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
    //   input: fs.createReadStream('./day2/input-basic.txt'),
      input: fs.createReadStream('./day2/input.txt'),
      crlfDelay: Infinity
    });
// ax rock   1
// by paper  2
// cz scissors  3

const scoreMap = {
    'A X':1+3,
    'A Y':2+6,
    'A Z':3+0,
    'B X':1+0,
    'B Y':2+3,
    'B Z':3+6,
    'C X':1+6,
    'C Y':2+0,
    'C Z':3+3,
}

// X 0
// Y 3
// Z 6
const scoreMapPart2 = {
    'A X':3+0,
    'A Y':1+3,
    'A Z':2+6,

    'B X':1+0,
    'B Y':2+3,
    'B Z':3+6,
    
    'C X':2+0,
    'C Y':3+3,
    'C Z':1+6,
}
    let score = 0
    let scorePart2 = 0
    
    rl.on('line', (line) => {
        score+=scoreMap[line]
        scorePart2+=scoreMapPart2[line]
    });

    await events.once(rl, 'close');


    console.log(`score: ${score}`);
    console.log(`scorePart2: ${scorePart2}`);

  } catch (err) {
    console.error(err);
  }
})();
