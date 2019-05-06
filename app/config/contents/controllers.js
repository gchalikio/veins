const mongo =`
const Product = require('../models/mongo.model');
const api = require('../functions/helpers');

exports.create = function (req, res, next) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function (err) {
        if (err) {
            return api.respond(res, 500, false, err, product);
        }
        api.respond(res, 200, true, "Product Created Successfully", product);
    })
};

exports.read = function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Products Read", products);
    })
};

exports.readOne = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Read", product);
    })
};

exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, product) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Updated", product);
    });
};

exports.delete = function (req, res) {
    Product.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Deleted successfully");
    })
};
`;

const fbase = `
const api = require('../functions/helpers');
const Product = require("../models/product");
const fbase = require('../config/connection');
const firestore = fbase.fbaseConfig();

exports.create = function (req, res, next) {
    const product = new Product(req.params.name, req.params.price);

    firestore.collection('products').add(product)
    .then(ref => {
        api.respond(res, 200, true, "Created product with ID", ref.id);
    })
    .catch((err) => {
        api.respond(res, 500, false, err, null);
    });
};

exports.read = async function (req, res) {
    let data = [];
    await firestore.collection('products').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let temp = doc.data();
            let product = {
                id: doc.id,
                name: temp.name,
                price: temp.price
            }
            data.push( product );
        });
    })
    .catch((err) => {
        api.respond(res, 500, false, err, null);
    });

    api.respond(res, 200, true, "fbase", data);
};

exports.readOne = function (req, res) {
    firestore.collection('products').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            api.respond(res, 200, false, "No such document!", null);
        } else {
            let temp = doc.data();
            let product = {
                id: doc.id,
                name: temp.name,
                price: temp.price
            }
            api.respond(res, 200, true, 'Document data', product);
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
        api.respond(res, 200, false, "fbase", data);
    });
};

exports.update = function (req, res) {
    const product = new Product(req.params.name, req.params.price);
    firestore.collection('products').doc(req.params.id).update(
        {
            price: 100
        }
    )
    .then(ref => {
        api.respond(res, 200, true, "Updated product with ID", req.params.id);
    })
    .catch((err) => {
        api.respond(res, 500, false, err, null);
    });

};

exports.delete = function (req, res) {
    firestore.collection('products').doc(req.params.id).delete()
    .then(ref => {
        api.respond(res, 200, true, "Deleted product with ID", req.params.id);
    })
    .catch((err) => {
        api.respond(res, 500, false, err, null);
    });
};
`;

const mysql = `

`;

const oracle = `

`;

const postgre = `

`;

module.exports.controllers = {
  fbase,
  mongo,
  mssql,
  mysql,
  oracle,
  postgre
}
