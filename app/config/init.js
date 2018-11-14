'use strict';
const config = require('./config');
const connection = require('./connection');

//initialise Database Configurations
module.exports.init = () => {
    if (config.databases.mysql) {
        console.log("mysql is enabled");
    }
    if (config.databases.postgre) {
        console.log("postgre is enabled");
    }
    if (config.databases.oracle) {
        console.log("oracle is enabled");
    }
    if (config.databases.mongo) {
        console.log("mongo is enabled");
        connection.mongoConfig();
    }
    if (config.databases.fbase) {
        console.log("fbase is enabled");
        //connection.fbaseConfig();
    }
    if (config.databases.mssql) {
        console.log("mssql is enabled");
    }
}