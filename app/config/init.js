'use strict';
const config = require('./config');

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
    }
    if (config.databases.fbase) {
        console.log("fbase is enabled");
    }
    if (config.databases.mssql) {
        console.log("mssql is enabled");
    }
}