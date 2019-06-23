const fs = require('fs');
const chalk = require('chalk');

// Add task process starts from here
const addTask = (title, desc) => {
    console.log("Title: "+title+",", "Description: "+desc);

    let data = loadData(title);
    let isDuplicate = chkDuplicate(title, data);
    if(isDuplicate) {
        console.log(chalk.bgRed.white(chalk.bold("Error: ") + `task with title ${title} already exist!`))
    } else {
        const newTask = {
            title,
            desc
        }
        saveToDatabase(newTask, data);
    }
}

// Method to save a task in file
const saveToDatabase = (task, data) => {
    let toBeSaved = [...data, task];
    toBeSaved = JSON.stringify(toBeSaved);

    fs.writeFileSync("data.txt", toBeSaved);
    console.log( chalk.bgGreen.white(chalk.bold("Congrats! ") + "task is added successfully."));
}

// Method to check either the new task exist already or not
const chkDuplicate = (title, data) => {
    let d = data.filter( (t) => title === t.title );

    return ( d.length === 0 ? false : true );
}

// Load data from file
const loadData = () => {
    try {
        const rawData = fs.readFileSync("data.txt");
        let data = JSON.parse(rawData);
        
        return data;
    } catch(e) {
        console.log(chalk.bgRed.white.bold("Error: ", e.message));
        return [];
    }
}

// Show all data available in file
const listAllData = () => {
    let data = loadData();
    if(data.length === 0) {
        console.log(chalk.bgYellow("No data found!"));
    } else {
        console.log(chalk.bgBlack.yellow.bold("\n\n\nListing all tasks...\n"));
        
        data.map( t => {
            console.log(chalk.bgBlack.white.bold("Title:",t.title));
            console.log("       " + chalk.bgWhite.black("Description: " + t.desc));
        } )
    }
}



// Show task with specific title
const findTask = (title) => {
    let data = loadData();
    if(data.length === 0) {
        console.log(chalk.bgRed.white.bold("No data found!"));
    } else {
        let d = data.filter( t => title === t.title );
        if(d.length === 0) {
            console.log(chalk.bgRed.white.bold(`No match found for ${title}!`));
        } else {
            let t = d[0];
            console.log(chalk.bgBlack.white.bold("Title:",t.title));
            console.log("       " + chalk.bgWhite.black("Description: " + t.desc));
        }
    }
}

// Delete all data from file
const deleteAllData = () => {
    fs.writeFileSync("data.txt", JSON.stringify([]));
    console.log(chalk.bgGreen.white.bold(`Data deleted successfully!`));
}

// Delete specific task
const deleteTask = (title) => {
    let data = loadData();
    
    if(data.length === 0) {
        console.log(chalk.bgRed.white.bold("No data found!"));
    } else {
        let d = data.filter( t => title === t.title );
        if(d.length === 0) {
            console.log(chalk.bgRed.white.bold(`No match found for ${title}!`));
        } else {
            d = data.filter( t => title !== t.title );
            fs.writeFileSync("data.txt", JSON.stringify(d));
            console.log(chalk.bgGreen.white.bold(`Task with title ${title} deleted!`));
        }
    }
}

// Update specific task
const updateTask = (title, desc) => {
    let data = loadData();

    if(data.length === 0) {
        console.log(chalk.bgRed.white.bold("No data found!"));
    } else {
        data = data.map( t => {
            if(title === t.title) {
                return {
                    title,
                    desc
                }
            } else {
                return t;
            }
        })

        fs.writeFileSync("data.txt", JSON.stringify(data));
        console.log(chalk.bgGreen.white.bold(`Task with title ${title} updated!`));
    }    
}


module.exports = {
    addTask,
    listAllData,
    findTask,
    deleteTask,
    deleteAllData,
    updateTask,
};