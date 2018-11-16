const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const helpers = require('./helpers');
var config = require('../config/config.json')
var exec = require('child_process').exec, child;
const ora = require('ora');

//manages route files
createRoute = (dbid, action) => {
  let path = './app/routes/' + config.modules[dbid].code + '.route.js';
  let pathExists = fs.existsSync(path);

  if (action) {
    if (pathExists) {
      console.log("Route already exists")
    } else {
      fs.writeFile(path, config.modules[dbid].routes.file, function (err) {
        if (err) throw err;
        console.log('Route successfully Saved!');
      });
    }
  } else {
    if (!pathExists) {
      console.log("Route does not exist")
    } else {
      fs.unlink(path, function (err) {
        if (err) throw err;
        console.log('Route deleted!');
      });
    }
  }
}
//manages controller files
createController = (dbid, action) => {
  let path = './app/controllers/' + config.modules[dbid].code + '.controller.js';
  let pathExists = fs.existsSync(path);

  if (action) {
    if (pathExists) {
      console.log("Controller already exists")
    } else {
      fs.writeFile(path, config.modules[dbid].controllers.file, function (err) {
        if (err) throw err;
        console.log('Controller successfully Saved!');
      });
    }
  } else {
    if (!pathExists) {
      console.log("Controller does not exist")
    } else {
      fs.unlink(path, function (err) {
        if (err) throw err;
        console.log('Controller deleted!');
      });
    }
  }
}
//manages model files
createModel = (dbid, action) => {
  let path = './app/models/' + config.modules[dbid].code + '.model.js';
  let pathExists = fs.existsSync(path);

  if (action) {
    if (pathExists) {
      console.log("Model already exists")
    } else {
      fs.writeFile(path, config.modules[dbid].models.file, function (err) {
        if (err) throw err;
        console.log('Model successfully Saved!');
      });
    }
  } else {
    if (!pathExists) {
      console.log("Model does not exist")
    } else {
      fs.unlink(path, function (err) {
        if (err) throw err;
        console.log('Model deleted!');
      });
    }
  }
}
//manages depedencies
manageDepedencies = (dbid, action) => {
  const depedency = config.modules[dbid].dependencies[0].title;

  if (action) {
    npmExec(depedency, true, "Installing MySQL depedencies");
  }
  else{
    npmExec(depedency, false, "Uninstalling MySQL depedencies");
  }
}
//runs npm install or uninstall depending on the action
npmExec = (depedency, install, msg) => {
  const action = install ? "install" : "uninstall";
  let depExists = checkDepedencies(depedency);
  
  if ( (install && !depExists) || (!install && depExists) ) {
    const spinner = ora(msg)
    spinner.start();

    child = exec('npm ' + action + ' ' + depedency,
      function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
          spinner.fail(chalk.red("Database successfully"));
        }
        spinner.succeed(chalk.green("Database successfully"));
      });
    }
}

checkDepedencies = (dep) => {
  const pkg = require("../../package");
  return pkg.dependencies.hasOwnProperty(dep);
}

//builds the model to hold the database information
buildModel = (config, dbid) => {
  const db = {
    title: "",
    code: "",
    path: "",
    pathExists: "",
    depedencies: "",
  }
}
//get db info from index id
mapIDtoDatabase = (dbid) => {
  console.log("mapping");

}

module.exports = {
  questions: {
    pickDatabase: () => {
      const questions = [{
        name: 'value',
        type: 'checkbox',
        message: 'Select the database you wish to apply!',
        choices: helpers.createDBArray(),
        default: ['MySql'],
        validate: function (value) {
          let val = value.toString().toLowerCase();
          return true;
        }
      }];
      return inquirer.prompt(questions);
    },
    action: () => {
      const actionList = [
        'List',
        'Add',
        'Remove',
        'Full',
        'Reset',
        'Destroy',
        'Exit'
      ];
      const questions = [{
        name: 'value',
        type: 'list',
        message: 'Select the action you wish to execute!',
        choices: actionList,
        default: ['Init'],
        validate: function (value) {
          console.log("value ", value);
          return value.actionPicker;
        }
      }];
      return inquirer.prompt(questions);
    },
  },
  actions: {
    list: () => {
      console.log(chalk.green("Available Databases: "));
      console.log(helpers.createDBString());
      checkDepedencies("minimist");
    },
  },
  init: {
    createFiles: async (dbid, action) => {
      if (dbid) {
        await createController(dbid, action);
        await createModel(dbid, action);
        await createRoute(dbid, action);
        manageDepedencies(dbid, action);
      } else {
        for (let i = 0; i < 2; i++) {
          const db = config.modules[i];
          createController(i, action);
          createModel(i, action);
          createRoute(i, action);
        }
      }
    },
    confirm: () => {
      const questions = [{
        name: 'value',
        type: 'confirm',
        message: 'Select the action you wish to execute!',
        choices: ['Y', 'n'],
        default: ['Y']
      }];
      return inquirer.prompt(questions);
    }
  }
}