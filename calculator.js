const args = process.argv.slice(2);

const command = args[0];
const num1 = parseInt(args[1]);
const num2 = parseInt(args[2]);
let result = 0;

if(isNaN(num1) || isNaN(num2)){
  console.log("Please provide valid numbers");
  process.exit(1);
}

//This works but is verbose. If you add 20 operations, you’ll have 20 case blocks.
switch(command){
  case "add": result = num1 + num2; break;

  case "sub": result = num1 - num2; break;

  case "mul": result = num1 * num2; break;

  case "div": result = num1 / num2; break;

  default: 
  console.log(`Unknown command. Use add, sub, mul, div`);
  process.exit(1);
}

//Instead, we can create an object to store such operations
const operations = {
  add : (a,b) => a + b,
  sub : (a,b) => a - b,
  mul : (a,b) => a * b,
  div : (a,b) => {
    if(b === 0){
      console.log("Error! Division by zero!");
      process.exit(1);
    }
    return a / b;
  }
}

if(!operations[command]){
  console.log("Unknown Command. Use add, sub, mul, div");
  process.exit(1);
}

const rseult = operations[command](num1, num2);
console.log("Result : ", rseult);


