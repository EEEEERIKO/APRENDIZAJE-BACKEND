const fs = require('fs');
const path = './tasks.json';

//read existing tasks
function loadTasks(){
    if(!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify([]));
    }
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}

//save tasks
function saveTasks(tasks){
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2))
}

//Capture arguments
const args = process.argv.slice(2);
const command = args[0]
switch(command){
    case 'add':
        const description = args.slice(1).join(" ")//take all the description
        if(!description){
            console.log('Please, text a description for the task')
        }

        const tasks = loadTasks();
        //create a new task
        const newTask = {
            id: tasks.length + 1,
            description: description,
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        //add the array and save
        tasks.push(newTask);
        saveTasks(tasks);

        console.log(`Task added correctly (ID: ${newTask.id})`)
        break;
    case 'list':
        console.log('Aquí listarás las tareas');
        break;
    default:
        console.log('Comando no reconocido');
}