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
function saveTasks(){
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2))
}

//Capture arguments
const args = process.argv.slice(2);
const command = args[0]
switch(command){
    case 'add':
        console.log('Aquí agregaras una terea');
        brack;
    case 'list':
        console.log('Aquí listarás las tareas');
        brack;
    default:
        console.log('Comando no reconocido');
}