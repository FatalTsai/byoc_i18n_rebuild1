const cUs = require('./English_28US29.json');
const oUs = require('./en_US.json');
const executor = require('child_process').exec;

let matchingCnt = 0;
let nonMatchingCnt = 0;
let objCnt = 0;

function recursiveJsonParser(obj) {
  objCnt += Object.keys(obj).length;
  // console.log(obj)
  console.log(` ${Object.keys(obj).length}`)
  Object.keys(obj).forEach((key)=>{
    if (typeof obj[key] == 'object') {
     recursiveJsonParser(obj[key])
    } else {
      let match = false
      for (i in cUs) {
        // console.log(`i: ${i}`)
        if (cUs[i] == obj[key]) {
          // console.log(`${i} == ${key} [${obj[key]}]"`)
          match = true
          break
        }
      }
      match? nonMatchingCnt++:  matchingCnt++;
      if (!match) {
        let val = obj[key];
        val = val.replace(/\\n/,'\\\\n');
 //       console.log('val ' + val);
        run(`echo ${key}  >> not_match`);
      }
    }
  })
   console.log('matching ' + matchingCnt);
   console.log('n matching ' + nonMatchingCnt);
   console.log('origin lenght: ' + objCnt)
};


recursiveJsonParser(oUs);


function run(cmd) {
  return new Promise(function(rso, rej) {
    executor(cmd, function(error, stdout, stderr) {
      if (error || stderr) {
        rej(new Error(`error [${error}], stderr[${stderr}]`));
      }
      rso(stdout.replace(/(\r\n|\n|\r)/gm, ''));
    });
  });
}
