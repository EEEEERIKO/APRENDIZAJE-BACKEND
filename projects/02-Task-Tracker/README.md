
# Task Tracker CLI by EEEEERIKO

A simple command-line application to manage your tasks and to-do list.

## Project Overview

This project is inspired by the [Task Tracker roadmap](https://roadmap.sh/projects/task-tracker) from roadmap.sh, which guides developers in building a task management CLI application. The goal is to practice programming skills, including working with the filesystem, handling user inputs, and building a simple CLI application.

## Features

- Add tasks
- Update task descriptions
- Delete tasks
- Mark tasks as "in-progress" or "done"
- List all tasks or filter by status

## File Structure

```
task-cli.js
tasks.json
README.md
```

- `task-cli.js`: The main script for the CLI application.
- `tasks.json`: The JSON file where tasks are stored.
- `README.md`: This file.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. Run the CLI commands:

   - Add a task:

     ```bash
     node task-cli.js add "Task description"
     ```

   - List all tasks:

     ```bash
     node task-cli.js list
     ```

   - Mark a task as done:

     ```bash
     node task-cli.js mark-done <task_id>
     ```

   - Update a task:

     ```bash
     node task-cli.js update <task_id> "New description"
     ```

   - Delete a task:

     ```bash
     node task-cli.js delete <task_id>
     ```

## Code Explanation

### 1. Importing Required Modules

```javascript
const fs = require('fs');
const path = './tasks.json';
```

- `fs`: Node.js module for interacting with the filesystem.
- `path`: The path to the JSON file where tasks are stored.

### 2. Loading Tasks

```javascript
function loadTasks() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify([]));
    }
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}
```

- Checks if `tasks.json` exists; if not, creates it with an empty array.
- Reads the file and parses the JSON data into a JavaScript object.

### 3. Saving Tasks

```javascript
function saveTasks(tasks) {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}
```

- Converts the `tasks` array into a JSON string and writes it to `tasks.json`, formatting it with 2 spaces for readability.

### 4. Command-Line Arguments

```javascript
const args = process.argv.slice(2);
const command = args[0];
```

- `process.argv`: Array containing command-line arguments.
- `slice(2)`: Skips the first two elements (`node` and script path).
- `command`: The first argument, determining the action (e.g., 'add', 'list').

### 5. Switch Statement for Commands

```javascript
switch (command) {
    case 'add':
        // Add task logic
        break;
    case 'list':
        // List tasks logic
        break;
    case 'mark-done':
        // Mark task as done logic
        break;
    case 'update':
        // Update task logic
        break;
    case 'delete':
        // Delete task logic
        break;
    default:
        console.log('Unknown command');
}
```

- Executes different blocks of code based on the `command` argument.

### 6. Adding a Task

```javascript
const description = args.slice(1).join(" ");
if (!description) {
    console.log('Please provide a description for the task');
    break;
}
const tasks = loadTasks();
const newTask = {
    id: tasks.length + 1,
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
tasks.push(newTask);
saveTasks(tasks);
console.log(`Task added with ID: ${newTask.id}`);
```

- Combines the remaining arguments into a single string for the task description.
- Loads existing tasks, creates a new task object, and adds it to the tasks array.
- Saves the updated tasks array to `tasks.json`.

### 7. Listing Tasks

```javascript
const tasks = loadTasks();
tasks.forEach(task => {
    console.log(`ID: ${task.id} | ${task.description} | Status: ${task.status}`);
});
```

- Loads tasks and iterates over them, printing each task's ID, description, and status.

### 8. Marking a Task as Done

```javascript
const id = parseInt(args[1]);
if (isNaN(id)) {
    console.log('Please provide a valid task ID');
    break;
}
const tasks = loadTasks();
const task = tasks.find(t => t.id === id);
if (!task) {
    console.log(`Task with ID ${id} not found`);
    break;
}
task.status = 'done';
task.updatedAt = new Date().toISOString();
saveTasks(tasks);
console.log(`Task ${id} marked as done`);
```

### 9. Updating a Task

```javascript
const id = parseInt(args[1]);
const newDescription = args.slice(2).join(" ");
if (isNaN(id) || !newDescription) {
    console.log('Usage: update <ID> <new description>');
    break;
}
const tasks = loadTasks();
const task = tasks.find(t => t.id === id);
if (!task) {
    console.log(`Task with ID ${id} not found`);
    break;
}
task.description = newDescription;
task.updatedAt = new Date().toISOString();
saveTasks(tasks);
console.log(`Task ${id} updated`);
```

### 10. Deleting a Task

```javascript
const id = parseInt(args[1]);
if (isNaN(id)) {
    console.log('Please provide a valid task ID');
    break;
}
let tasks = loadTasks();
tasks = tasks.filter(t => t.id !== id);
saveTasks(tasks);
console.log(`Task ${id} deleted`);
```

- Parses the task ID from the arguments.
- Loads tasks, filters out the task with the given ID, and saves the updated tasks array.

## License

MIT License. See [LICENSE](LICENSE) for details.

