// const fs = require('fs');

// function main(){
//     fs.readFile('input.txt', 'utf8', function(err, data) {
//         if (err) throw err;
//         console.log(data);
//     });
// }

// main();





const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream('./Day1_Calorie_Counting/input-basic.txt'),
      input: fs.createReadStream('./Day1_Calorie_Counting/input.txt'),
      crlfDelay: Infinity
    });

    let calSum = 0
    let calSumMaxJSON = [0, 0, 0]
    let calSumMaxMin = 0

    rl.on('line', (line) => {
      if (line == '') {

        if (calSum > calSumMaxMin) {
          const min = Math.min(...calSumMaxJSON);
          const index = calSumMaxJSON.indexOf(min);
          calSumMaxJSON[index] = calSum
          calSumMaxMin = Math.min(...calSumMaxJSON);
        }
        calSum = 0
      } else {
        calSum = calSum + Number(line)
      }
    });

    await events.once(rl, 'close');

    if (calSum > calSumMaxMin) {
      const min = Math.min(...calSumMaxJSON);
      const index = calSumMaxJSON.indexOf(min);
    }

    const sum = calSumMaxJSON.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    console.log(`sum: ${sum}`);

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})();
