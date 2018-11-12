var fs = require('fs');
var config = require('../config/config.json')



const createFiles = () => {
    var dbid = 0;
    createController(dbid);
    createModel(dbid);
    createRouter(dbid);
}

const createController = (dbid) => {

    let path = '../controllers/'+config.modules[dbid].title+'.controller.js';
    if (fs.existsSync(path)) {
        console.log("db file already exists")
    }else{
        fs.writeFile(path, config.modules[dbid].controllers.text, function (err) {
            if (err) throw err;
            console.log('controller successfully Saved!');
          });
    }
    
}
const createModel = (dbid) => {
    let path = '../models/'+config.modules[dbid].title+'.model.js';
    if( fs.existsSync(path)){
        console.log("db file already exists")
    }else{
    fs.writeFile(path, config.modules[dbid].models.text, function (err) {
        if (err) throw err;
        console.log('Model successfully saved!');
      });
    }
}
const createRouter = (dbid) => {

    let path = '../routes/'+config.modules[dbid].title+'.route.js';
    if( fs.existsSync(path)){
        console.log("db file already exists")
    }else{
    fs.writeFile(path, config.modules[dbid].routes.text, function (err) {
        if (err) throw err;
        console.log('Router successfully saved!');
      });
    }
}

createFiles();