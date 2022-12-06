
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

    // Part 1
    // let supplyStack = []
    // let isMoves = false
    // rl.on('line', (line) => {
    //   if (line == '') {
    //     isMoves = true
    //     return;
    //   }
    //   if (isMoves) {
    //     let [t1, move, t2, from, t3, to] = line.split(' ')

    //     for (let i = 0; i < move; i++) {
    //       supplyStack[to - 1].push(supplyStack[from - 1].pop())
    //     }
    //   } else {
    //     const rowArray = line.match(/.{1,4}/g) ?? [];
    //     for (let i = 0; i < rowArray.length; i++) {
    //       let val = rowArray[i].trim()
    //       if (val != '' && val[0] == '[') {
    //         if (supplyStack[i]) supplyStack[i].unshift(val)
    //         else supplyStack[i] = [val]
    //       }
    //     }
    //   }
    // });
    // await events.once(rl, 'close');
    // console.log(`supplyStack: ${supplyStack.map(e => e.pop()[1]).join('')}`);

    // Part 2
    let supplyStack = []
    let isMoves = false
    rl.on('line', (line) => {
      if (line == '') {
        isMoves = true
        return;
      }
      if (isMoves) {
        let [t1, move, t2, from, t3, to] = line.split(' ')

        let length = supplyStack[from - 1].length
        let value = supplyStack[from - 1].splice(length - move, move)

        supplyStack[to - 1].push(...value)
      } else {
        const rowArray = line.match(/.{1,4}/g) ?? [];
        for (let i = 0; i < rowArray.length; i++) {
          let val = rowArray[i].trim()
          if (val != '' && val[0] == '[') {
            if (supplyStack[i]) supplyStack[i].unshift(val)
            else supplyStack[i] = [val]
          }
        }
      }
    });
    await events.once(rl, 'close');
    
    console.log(`supplyStack: ${supplyStack.map(e => e.pop()[1]).join('')}`);



  } catch (err) {
    console.error(err);
  }
})();
