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
        const tasksL = loadTasks();
        const filter = args[1]
        if(tasksL.length === 0){
            console.log("No hay tareas aún.")
        } else{
            //if there is a filter, filter by states
            const filteredTasks = filter ? tasksL.filter(t=> t.status === filter) : tasksL;

            if(filteredTasks.length === 0){
                console.log(`No existen tareas con el estado: ${filter}`)
            }else{
                filteredTasks.forEach(task => {
                    console.log(`ID: ${task.id} | ${task.description} | Status: ${task.status} | Created at: ${task.createdAt}`)
                })
            }
        }
        break;

    case 'mark-done':
        const id = parseInt(args[1]);
        const lTasks = loadTasks();
        const lTask = lTasks.find(t => t.id === id)
        if(lTask){
            lTask.status = "done";
            lTask.updatedAt = new Date().toISOString();
            saveTasks(lTasks);
            console.log(`Tarea ${id} ha sido marcada como hecha`)
        }else{
            console.log("tarea no enontrada")
        }
        break;

     case 'mark-doing':
        const idDone = parseInt(args[1]);
        const lTasksDone = loadTasks();
        const lTaskDone = lTasksDone.find(t => t.id === idDone)
        if(lTaskDone){
            lTaskDone.status = "doing";
            lTaskDone.updatedAt = new Date().toISOString();
            saveTasks(lTasksDone);
            console.log(`Tarea ${idDone} ha sido marcada como en proceso`)
        }else{
            console.log("tarea no enontrada")
        }
        break;

    default:
        console.log('Comando no reconocido');
    
}