// I’m creating another command-line todo list using the Commander library, but I also have a file named todo.js where I built a basic todo in plain Node.js without any external libraries.

const fs = require("fs");
const { Command } = require('commander');
const program = new Command();
const filePath = "./todos.json"

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

program
.command('list <todo>')
.description('Show me the list')
.option('-f, --file <type>', 'sepcify file path', 'mytasks.json')
.option('-t, --type <type>', 'specify the item', 'default')
.action((todo, options) => {
  const todos = fs.readFileSync(options.file, "utf-8");
  if(todos.length === 0){
    console.log("No todos yet.");
  }else{
    console.log("Your Todos:");
    todos.forEach(todo, i => {
      console.log(`${i+1}. ${todo.text}`);
    });
  }
})

program
.command('delete <id>')
.description('Delete a todo')
.option('-f, --file <type>', 'specify file path', 'mytasks.json')
.option('-t, --type <type>', 'specify the item', 'default')
.action((id, options) => {
  const index = parseInt(id) -1;
  const data = fs.readFileSync(options.file, "utf-8");
  const todos = JSON.parse( data || []);
  const removed_index = todos.splice(index, 1);
  fs.writeFileSync(options.file, JSON.stringify(todos, null, 2));
  console.log(`Deleted : ${removed_index[0].text}`);
})

program
.command('update <id> <todo>')
.description('update todo')
.option('-f, --file <type>', 'specify file path', 'mytasks.json')
.option('-t, --type <type>', 'specify the item', 'default')
.action((id, todo, options) => {
  const index = parseInt(id) -1;
  const data = fs.readFileSync(options.file, "utf-8");
  const todos = JSON.parse(data || []);
  todos[index].text = todo;
  todos[index].type = options.type
  fs.writeFileSync(options.file, JSON.stringify(todos, null ,2));
  console.log(`Updated: ${index}. ${todo}`);
})

program.parse();

const options = program.opts();

if(options.debug) {
  console.log("Debug mode ON, (extra logs will appear here in the future.");
}


//For reference - https://betterstack.com/community/guides/scaling-nodejs/commander-explained/?utm_source=chatgpt.com 



