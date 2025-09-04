// 🧠 Goal: Show how callbacks prevent blocking and use the error-first pattern.


// Synchronous function with callback (runs immediately)
function syncCallback(cb) {
  cb("✅ I run immediately, no async here");
}

syncCallback((msg) => console.log(msg));
console.log("I print after the callback"); 
// Order is always the same: callback first, then this line

// Asynchronous function with callback
function asyncCallback(cb) {
  setTimeout(() => {
    cb("✅ I run later, thanks to setTimeout (async)");
  }, 1000);
}

asyncCallback((msg) => console.log(msg));
console.log("I print first, async callback will come later");


//Fake asyn operation(like reading a file or fetching data)
function fakeAsyncTask(taskName, shouldFail, callback){
    console.log(`[${taskName}] started...`);

    setTimeout(() => {
        if(shouldFail)
            //Error-first: fist arg = error, second = result
            return callback(new Error(`${taskName} failed`), null);
    })

    //Success: error = null, result = something
    callback(null, `${taskName} finished`)
}


fakeAsyncTask("Task 1", false, (err, result) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Result:", result);
    }
})