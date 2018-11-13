"use strict";
const appServer = require('../functions/respond');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

const config = require('../config/creds/mssql');
const database = config.sql.options.database;
var connect = require('../config/connection');
var db = connect.mssqlConfig;

module.exports.create = (req, res, next) => {
    return 1;
}

module.exports.read = (req, res, next) => {
    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            appServer.answers(res, 500, true, err, null);
        } 
        let data = [];
        var request = new Request(`
        SELECT ID, Code, DefaultDescr, Swactive, ShortDescr FROM [${database}].[dbo].[Ports] where Swactive=0;`,
        function(err, rows) {  
            err && appServer.answers(res, 500, true, err, null);
            connection.close();
            appServer.answers(res, 200, true, "Products Read", data);
        });  

        request.on('row', function(columns) { 
            data.push({
                id: columns[0].value,
                portCode: columns[1].value,
                description: columns[2].value,
                isActive: columns[3].value,
                ShortDescr: columns[4].value
              })
        });   
        connection.execSql(request);
    });
}

module.exports.readOne = (req, res, next) => {
    return 1;
}

module.exports.update = (req, res, next) => {
    return 1;
}

module.exports.delete = (req, res, next) => {
    return 1;
}