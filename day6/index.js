
const events = require('events');
const fs = require('fs');
const readline = require('readline');

function checkForDuplicates(array) {
  return new Set(array).size !== array.length
}

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      // input: fs.createReadStream(`${__dirname}/input-basic.txt`),
      input: fs.createReadStream(`${__dirname}/input.txt`),
      crlfDelay: Infinity
    });
    
    // part 1
    // rl.on('line', (line) => {
    //   const arr = []
    //   for(let i=0;i<line.length;i++){
    //     if(i<3){
    //       arr.push(line[i])
    //     }else{
    //       arr.push(line[i])
    //       if(!checkForDuplicates(arr)){
    //         console.log('arr',arr)
    //         console.log('i',i+1)
    //         break;
    //       }
    //       arr.shift()
    //     }

    //   }
    // });

    // part 2
    rl.on('line', (line) => {
      const arr = []
      for(let i=0;i<line.length;i++){
        if(i<13){
          arr.push(line[i])
        }else{
          arr.push(line[i])
          if(!checkForDuplicates(arr)){
            console.log('arr',arr)
            console.log('i',i+1)
            break;
          }
          arr.shift()
        }

      }
    });

    await events.once(rl, 'close');

  } catch (err) {
    console.error(err);
  }
})();
