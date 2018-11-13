const appServer = require('../functions/respond');
const fbase = require('../config/connection');
const firestore = fbase.fbaseConfig();

exports.create = function (req, res, next) {
    let product = {
        name: req.body.name,
        price: req.body.price
    };

    firestore.collection('products').add(product)
    .then(ref => {
        appServer.answers(res, 200, true, "Created product with ID", ref.id);
    })
    .catch((err) => {
        appServer.answers(res, 500, false, err, null);
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
        appServer.answers(res, 500, false, err, null);
    });
    
    appServer.answers(res, 200, true, "fbase", data);
};

exports.readOne = function (req, res) {
    firestore.collection('products').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            appServer.answers(res, 200, false, "No such document!", null);
        } else {
            let temp = doc.data();
            let product = { 
                id: doc.id,
                name: temp.name,
                price: temp.price
            } 
            appServer.answers(res, 200, true, 'Document data', product);
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
        appServer.answers(res, 200, false, "fbase", data);
    });  
};

exports.update = function (req, res) {
    // let product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    firestore.collection('products').doc(req.params.id).update(
        {
            price: 100    
        }
    )
    .then(ref => {
        appServer.answers(res, 200, true, "Updated product with ID", req.params.id);
    })
    .catch((err) => {
        appServer.answers(res, 500, false, err, null);
    });

};

exports.delete = function (req, res) {
    firestore.collection('products').doc(req.params.id).delete()
    .then(ref => {
        appServer.answers(res, 200, true, "Deleted product with ID", req.params.id);
    })
    .catch((err) => {
        appServer.answers(res, 500, false, err, null);
    });
};