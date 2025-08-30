// process → a built-in Node.js object that gives info about the running process (your script).

//.argv → stands for argument vector (fancy word for “list of arguments”).

const args = process.argv.slice(2);
const command = args[0];


//BODMASS branch don't parse numbers
if(command === "bodmass"){
  const expression = args.slice(1).join(" "); //allow without quotes too
  console.log("Result (BODMASS) : ", eval(expression));
}

//otherwise parse numbers
const num = args.slice(1).map(Number);
// const num1 = parseInt(args[1]);
// const num2 = parseInt(args[2]);
// let result = 0;

// if(isNaN(num1) || isNaN(num2)){
//   console.log("Please provide valid numbers");
//   process.exit(1);
// }


//This works but is verbose. If you add 20 operations, you’ll have 20 case blocks.
// switch(command){
//   case "add": result = num1 + num2; break;

//   case "sub": result = num1 - num2; break;

//   case "mul": result = num1 * num2; break;

//   case "div": result = num1 / num2; break;

//   default: 
//   console.log(`Unknown command. Use add, sub, mul, div`);
//   process.exit(1);
// }

//Instead, we can create an object to store such operations
const operations = {
  add : (...a) => a.reduce((acc,b) => acc + b, 0), // node calculator.js add 1 2 3 4 => 10
  sub : (a,b) => a - b,
  mul : (...a) => a.reduce((acc,b) => acc * b, 1), //
  pow : (a,b) => a ** b,
  mod : (a,b) => a % b,
  sqrt : (a) => Math.sqrt(a),
  div : (a,b) => {
    if(b === 0){
      console.log("Error! Division by zero!");
      process.exit(1);
    }
    return a / b;
  } 
};

if(!operations[command]){
  console.log("Unknown Command. Use add, sub, mul, div");
  process.exit(1);
}

// const rseult = operations[command](num1, num2);
const rseult = operations[command](...num) //spread into f(n)

if(num.some(isNaN)){
  console.log("Please provide valid numbers");
  process.exit(1);
}else{
  console.log("Result : ", rseult);
}

// Concepts used in this file:
// 1. process.argv → to read command-line arguments
// 2. Array.reduce() → to handle multiple numbers in operations
// 3. Expression parser (using eval) → to support BODMAS evaluation
