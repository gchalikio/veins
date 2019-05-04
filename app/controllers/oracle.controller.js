"use strict";
var db = require("../config/connection").oracleConfig;
const Product = require("../models/product");

module.exports.read = (req, res, next) => {

    var sql = `select * from zproducts`
    var binds = [];
    var options = {};
    var data = [];

    db.doConnect((err, connection) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            title: "Database connection error",
            error: err
          });
        }

        connection.execute(
            sql, binds, options,
            function (err, result) {
              if (err) {
                console.error(err)
                db.doRelease(connection);
                return;
              }
              data = result.rows.map(row => {
                return {
                  name: row[0],
                  price: row[1],
                };
              });
              return res.status(200).json({
                status: "Success"
              });
            }
        );
    });
}

module.exports.readOne = (req, res, next) => {

    var id = req.params.id;
    var sql = `select * from zproducts where name = :id`
    var binds = [id];
    var options = {};
    var data;

    db.doConnect((err, connection) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            title: "Database connection error",
            error: err
          });
        }

        connection.execute(
            sql, binds, options,
            function (err, result) {
              if (err) {
                console.error(err)
                db.doRelease(connection);
                return;
              }
              data = {
                  name : result.rows[0],
                  price: result.rows[1]
              }

              db.doRelease(connection);
              return res.status(200).json({
                status: "Success"
              });
            }
        );
    });
}

module.exports.update = (req, res, next) => {
    var id = req.params.id;
    var sql = "update zproducts set price = 35 where name = :id"
    var binds = [id];

    var options = {
        autoCommit: true,
      };

    db.doConnect((err, connection) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            title: "Database connection error",
            error: err
          });
        }

        connection.execute(
            sql, binds, options,
            function (err, result) {
              if (err) {
                console.error(err)
                db.doRelease(connection);
                return;
              }
              db.doRelease(connection);
              return res.status(200).json({
                status: "Update Success"
              });
            }
        );
    });
}

module.exports.delete = (req, res, next) => {
    var id = req.params.id;
    var sql = "delete from zproducts where name = :id"
    var binds = [id];

    var options = {
        autoCommit: true,
      };

    db.doConnect((err, connection) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            title: "Database connection error",
            error: err
          });
        }

        connection.execute(
            sql, binds, options,
            function (err, result) {
              if (err) {
                console.error(err)
                db.doRelease(connection);
                return;
              }
              db.doRelease(connection);
              return res.status(200).json({
                status: "Delete Success"
              });
            }
        );
    });
}

module.exports.create = (req, res, next) => {
    var product = new Product(req.body.name,req.body.price)
    var sql = "insert into zproducts (name,price) values (:name, :price)"
    var binds = [
            product.name,
            product.price
    ];

    var options = {
        autoCommit: true,
      };

    db.doConnect((err, connection) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            title: "Database connection error",
            error: err
          });
        }

        connection.execute(
            sql, binds, options,
            function (err, result) {
              if (err) {
                console.error(err)
                db.doRelease(connection);
                return;
              }
              db.doRelease(connection);
              return res.status(200).json({
                status: "Insert Success"
              });
            }
        );
    });
}
