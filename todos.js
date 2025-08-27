const { error } = require("console");
const fs = require("fs");

// File where todos are stored
const filePath = "./todos.json";

//Defined my own custom error type
class ValidationError extends Error {
  constructor(message){
    super(message);
    this.name = "ValidationError"
  }
}

// Helper: load todos from file
function loadTodos() {
  if (!fs.existsSync(filePath)) { 
    throw new ValidationError(`file path doesn't exist ${filePath}`);
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

// Helper: save todos back to file
function saveTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf-8");
}

// CLI arguments
const args = process.argv.slice(2);
const command = args[0]; // first argument (add, list, delete, update, etc.)

let todos = loadTodos();

// Commands
switch (command) {
  case "add":
    const newTodo = args.slice(1).join(" ");
    if (!newTodo) {
      console.log("Please provide a todo text.");
      process.exit(1);
    }
    todos.push({ title: newTodo });
    saveTodos(todos);
    console.log(`Added: "${newTodo}"`);
    break;

  case "list":
    if (todos.length === 0) {
      console.log("No todos yet.");
    } else {
      console.log("Your Todos:");
      todos.forEach((todo, i) => console.log(`${i + 1}. ${todo.title}`));
    }
    break;

  case "delete":
    const deleteIndex = parseInt(args[1]) - 1;
    if (isNaN(deleteIndex) || deleteIndex < 0 || deleteIndex >= todos.length) {
      console.log("Please provide a valid todo number to delete.");
      process.exit(1);
    }
    const removed = todos.splice(deleteIndex, 1);
    saveTodos(todos);
    console.log(`Deleted: "${removed[0].title}"`);
    break;

  case "update":
    const updateIndex = parseInt(args[1]) - 1;
    const updatedText = args.slice(2).join(" ");
    if (isNaN(updateIndex) || updateIndex < 0 || updateIndex >= todos.length) {
      console.log("Please provide a valid todo number to update.");
      process.exit(1);
    }
    if (!updatedText) {
      console.log("Please provide new text for the todo.");
      process.exit(1);
    }
    todos[updateIndex].title = updatedText;
    saveTodos(todos);
    console.log(`Updated todo #${updateIndex + 1} to: "${updatedText}"`);
    break;

  default:
    console.log(`
Usage: node index.js <command> [arguments]

Commands:
  add <todo>       Add a new todo
  list             List all todos
  delete <number>  Delete a todo by number
  update <number> <new text> Update a todo
    `);
}
