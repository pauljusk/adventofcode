
const events = require('events');
const fs = require('fs');
const readline = require('readline');

const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

// console.log(1)
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream('./day4/input-basic.txt'),
      input: fs.createReadStream('./day4/input.txt'),
      crlfDelay: Infinity
    });


    // Part 1
    // let score = 0
    // rl.on('line', (line) => {
    //   const row = line.split(',')
    //   const [min1, max1] = row[0].split('-')
    //   const [min2, max2] = row[1].split('-')

    //   if
    //     ((Number(min1) <= Number(min2) && Number(max1) >= Number(max2)) ||
    //     (Number(min1) >= Number(min2) && Number(max1) <= Number(max2))) {
    //     score++
    //   }
    // });

    // await events.once(rl, 'close');
    // console.log(`score: ${score}`);

    // Part 2
    let score = 0
    rl.on('line', (line) => {
      const row = line.split(',')
      const [min1, max1] = row[0].split('-')
      const [min2, max2] = row[1].split('-')

      const check = (
        (Number(min1) < Number(min2) && Number(max1) < Number(min2))
        || (Number(min1) > Number(max2) && Number(max1) > Number(max2))
      )
      if (!check) {
        score++
      }
    });

    await events.once(rl, 'close');
    console.log(`score: ${score}`);

    // Part 2
    // let score = 0
    // let group = []
    // rl.on('line', (line) => {
    //   group.push([...new Set(line)])
    //   if (group.length == 3) {

    //     let [item] = group[0].filter(e => group[1].find(e2 => e == e2) && group[2].find(e2 => e == e2))
    //     score += alphaVal(item)
    //     if (item.toUpperCase() === item) score += 26

    //     group = []
    //   }
    // });

    // await events.once(rl, 'close');
    // console.log(`score: ${score}`);

  } catch (err) {
    console.error(err);
  }
})();
