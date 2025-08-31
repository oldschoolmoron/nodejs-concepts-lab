// I’m creating another command-line todo list using the Commander library, but I also have a file named todo.js where I built a basic todo in plain Node.js without any external libraries.

const fs = require("fs");
const { Command } = require('commander');

const program = new Command();
// Currently experimenting with commander.js basics
program 
.name("my-cli")
.description('CLI to do file based tasks')
.version("1.2.3")
.option('-d, --debug', 'O/P extra debudding information');

program.parse();

const options = program.opts();

if(options.debug) {
  console.log("Debug mode is ON, (extra logs will appear here in the future.");
}

//For reference - https://betterstack.com/community/guides/scaling-nodejs/commander-explained/?utm_source=chatgpt.com 



