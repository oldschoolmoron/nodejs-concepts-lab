// I’m creating another command-line todo list using the Commander library, but I also have a file named todo.js where I built a basic todo in plain Node.js without any external libraries.

const fs = require("fs");
const { Command } = require('commander');
const program = new Command();
const filePath = "./todos.json"
// Currently experimenting with commander.js basics
program 
.name("my-cli")
.description('CLI to do file based tasks')
.version("1.2.3")
.option('-d, --debug', 'O/P extra debudding information');

program
.command('add <todo>')
.description("Add a new todo")
.option('-f, --file <type>', 'specify file path', 'mytasks.json')
.option('-t, --type <type>', 'specify the item type', 'default')
.action((todo, options) => {
  const data = fs.readFileSync(options.file, "utf-8");
  const todos = JSON.parse(data || "[]");
  todos.push({ text: todo, type: options.type})
  fs.writeFileSync(options.file, JSON.stringify(todos, null, 2));
  console.log(`Added: "${todo}" to ${options.file}`);
})

program.parse();

const options = program.opts();

if(options.debug) {
  console.log("Debug mode is ON, (extra logs will appear here in the future.");
}


//For reference - https://betterstack.com/community/guides/scaling-nodejs/commander-explained/?utm_source=chatgpt.com 



