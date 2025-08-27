// process.argv is an array of command-line arguements
// [0] = path to node
// [1] = path to your script (index.js)
// [2+] = actual arguements you psas
const process = require("process");
// console.log(process.argv);
const argv = process.argv; 

console.log("number of arguement is "+argv.length);

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
// const args = process.argv.slice(2);

// if(args.includes("-h")){
//   console.log('Usage : node index.js <words>');
//   console.log('Example : node index.js hello world');
//   process.exit(0);
// }

// //Join all arguements into one string
// const input = args.join(" ");
// const wordCount = args.length;

// console.log(`You entered : "${input}`);
// console.log(`Word Count : ${wordCount}`);
