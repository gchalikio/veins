"use strict";
var Request = require('tedious').Request;
const api = require('@veins/vn-api');
const Product = require("../models/product");
const config = require('../config/creds/mssql');
const database = config.sql.options.database;
var db = require('../config/connection').mssqlConfig;

module.exports.create = (req, res, next) => {
    const product = new Product(req.params.name, req.params.price);

    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            api.answers(res, 500, true, err, null);
        } 
        var request = new Request(`
        Insert into [${database}].[dbo].[Ports] (name, price) values (${product.name}, ${product.price});`,
        function(err, rows) {  
            err && api.answers(res, 500, true, err, null);
            connection.close();
            api.answers(res, 200, true, "Product Created", product);
        });    
        connection.execSql(request);
    });
}

module.exports.read = (req, res, next) => {
    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            api.answers(res, 500, true, err, null);
        } 
        let data = [];
        var request = new Request(`
        SELECT ID, Code, DefaultDescr, Swactive, ShortDescr FROM [${database}].[dbo].[Ports] where Swactive=0;`,
        function(err, rows) {  
            err && api.answers(res, 500, true, err, null);
            connection.close();
            api.answers(res, 200, true, "Products Read", data);
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
    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            api.answers(res, 500, true, err, null);
        } 
        let data = {};
        var request = new Request(`
        SELECT ID, Code, DefaultDescr, Swactive, ShortDescr FROM [${database}].[dbo].[Ports] where Swactive=0 and id = ${req.params.id};`,
        function(err, rows) {  
            err && api.answers(res, 500, true, err, null);
            connection.close();
            api.answers(res, 200, true, "Products Read", data);
        });  

        request.on('row', function(columns) { 
            data = {
                id: columns[0].value,
                portCode: columns[1].value,
                description: columns[2].value,
                isActive: columns[3].value,
                ShortDescr: columns[4].value
            }
        });   
        connection.execSql(request);
    });
}

module.exports.update = (req, res, next) => {
    const product = new Product(req.params.name, req.params.price);
    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            api.answers(res, 500, true, err, null);
        } 
        var request = new Request(`
        Update [${database}].[dbo].[Ports] set Swactive=${product.price} where id=${req.params.id};`,
        function(err, rows) {  
            err && api.answers(res, 500, true, err, null);
            connection.close();
            api.answers(res, 200, true, "Product Updated", req.params.id);
        });    
        connection.execSql(request);
    });
}

module.exports.delete = (req, res, next) => {
    db.doConnect((err, connection) => {
        if (err) {
            db.doRelease(connection);
            api.answers(res, 500, true, err, null);
        } 
        var request = new Request(`
        Delete [${database}].[dbo].[Ports] where id=${req.params.id};`,
        function(err, rows) {  
            err && api.answers(res, 500, true, err, null);
            connection.close();
            api.answers(res, 200, true, "Product Deleted", req.params.id);
        });   
        connection.execSql(request);
    });
}