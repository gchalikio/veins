const program = require('commander');
const logic = require('./cli-logic');
const {
    prompt
} = require('inquirer');

const questions = [{
        type: 'input',
        name: 'firstname',
        message: 'Enter firstname ..'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter lastname ..'
    }
];

program
    .version('0.0.1')
    .description('Contact management system')

//-----LIST ALL DATABASES AVAILABLE-----//
program
    .command('list')
    .alias('li')
    .description('List all databases')
    .action(() => {
        logic.actions.list();
    });

//-----ADD A SPECIFIC DATABASE-----//
program
    .command('add <db>')
    .alias('a')
    .description('Add a database')
    .action(db => console.log("db ", db));

//-----REMOVE A SPECIFIC DATABASE-----//
program
    .command('remove <db>')
    .alias('r')
    .description('Remove a database')
    .action(db => console.log("db ", db));

//-----FULL INSTALL ALL DATABASES-----//
program
    .command('full')
    .alias('f')
    .description('Install all databases')
    .action(() => console.log("name "));

//-----UNINSTALL/RESET ALL DATABASES EXCEPT DEFAULT-----//
program
    .command('reset')
    .alias('rs')
    .description('Reset all')
    .action(() => console.log("reset"));

//-----DESTROY EVERYTHING FROM VEINS AND LEAVE A CLEAN NODE/EXPRESS INSTALLATION-----//
program
    .command('destroy')
    .alias('d')
    .description('Destroy veins')
    .action(() => console.log("destroy "));

module.exports = program;