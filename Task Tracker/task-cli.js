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