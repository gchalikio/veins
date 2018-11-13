//--------------------MONGO-----------------------//
exports.mongoConfig = () => {
    const mongoose = require('mongoose');
    let dev_db_url = 'mongodb://root:root123@ds217002.mlab.com:17002/mongo-vein';
    let mongoDB = process.env.MONGODB_URI || dev_db_url;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true
    });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

//--------------------FBASE-----------------------//
exports.fbaseConfig = () => {
        const admin = require('firebase-admin');
        var cred = require('./firebase');
        // Fetch the service account key JSON file contents

        // Initialize the app with a service account, granting admin privileges
        admin.initializeApp({
            credential: admin.credential.cert(cred),
            databaseURL: "https://fir-app-f846f.firebaseio.com"
        });

        // As an admin, the app has access to read and write all data, regardless of Security Rules
        var db = admin.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        db.settings(settings);
        return db;
    }


//--------------------MSSQL-----------------------//
exports.mssqlConfig = () => {
    const mongoose = require('mongoose');
    let dev_db_url = 'mongodb://root:root123@ds217002.mlab.com:17002/mongo-vein';
    let mongoDB = process.env.MONGODB_URI || dev_db_url;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true
    });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}