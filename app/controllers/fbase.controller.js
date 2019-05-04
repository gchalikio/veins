const api = require('../functions/helpers');
const Product = require("../models/product");
const fbase = require('../config/connection');
const firestore = fbase.fbaseConfig();

exports.create = function (req, res, next) {
    const product = new Product(req.params.name, req.params.price);

    firestore.collection('products').add(product)
    .then(ref => {
        api.answers(res, 200, true, "Created product with ID", ref.id);
    })
    .catch((err) => {
        api.answers(res, 500, false, err, null);
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
        api.answers(res, 500, false, err, null);
    });

    api.answers(res, 200, true, "fbase", data);
};

exports.readOne = function (req, res) {
    firestore.collection('products').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            api.answers(res, 200, false, "No such document!", null);
        } else {
            let temp = doc.data();
            let product = {
                id: doc.id,
                name: temp.name,
                price: temp.price
            }
            api.answers(res, 200, true, 'Document data', product);
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
        api.answers(res, 200, false, "fbase", data);
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
        api.answers(res, 200, true, "Updated product with ID", req.params.id);
    })
    .catch((err) => {
        api.answers(res, 500, false, err, null);
    });

};

exports.delete = function (req, res) {
    firestore.collection('products').doc(req.params.id).delete()
    .then(ref => {
        api.answers(res, 200, true, "Deleted product with ID", req.params.id);
    })
    .catch((err) => {
        api.answers(res, 500, false, err, null);
    });
};
