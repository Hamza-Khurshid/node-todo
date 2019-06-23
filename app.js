const yargs = require('yargs');
const chalk = require('chalk');
const {addTask, listAllData, findTask, deleteTask, deleteAllData, updateTask} = require('./todo');

yargs.command({
    command: 'add',
    describe: 'Add new record to database!',
    builder: {
        title: {
            describe: 'Title',
            alias: 't',
            demandOption: true,
            type: 'string',
        },
        description: {
            describe: 'Description',
            alias: 'd',
            demandOption: true,
            type: 'string',
        }
    },
    handler: ({title, description}) => {
        if(title != null && description != null) 
            if(title != "" && description != "")
                addTask(title, description);
            else 
                console.log("You need to enter values for title and descrption to record!");
        else 
            console.log("You must specify title and description to add new record!");    
    }
})

yargs.command({
    command: 'list',
    describe: 'Find a task!',
    builder: {
        title: {
            describe: 'Title',
            alias: 't',
            demandOption: false,
            type: 'string',
        },
    },
    handler: (arg) => {
        if(arg.title != null) {
            if(arg.title != "")
                findTask(arg.title)
            else
            console.log(chalk.bgRed.white("Empty title is not allowed!"));
                
        } else {
            listAllData();
        }        
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete a task!',
    builder: {
        title: {
            describe: 'Title',
            alias: 't',
            demandOption: false,
            type: 'string',
        },
    },
    handler: (arg) => {
        if(arg.title != null) {
            if(arg.title != "")
                deleteTask(arg.title)
            else
                console.log(chalk.bgRed.white("Empty title is not allowed!"));
                
        } else {
            deleteAllData();
        }        
    }
})

yargs.command({
    command: 'update',
    describe: 'Update a task!',
    builder: {
        title: {
            describe: 'Title',
            alias: 't',
            demandOption: true,
            type: 'string',
        },
        description: {
            describe: 'Title',
            alias: 'd',
            demandOption: true,
            type: 'string',
        },
    },
    handler: ({title, description}) => {
        if (title != null && description != null)
            if (title != "" && description != "")
                updateTask(title, description);
            else
                console.log("You need to enter values for title and descrption to update a task!");
        else
            console.log("You must specify title and description to update task!");         
    }
})

yargs.parse()