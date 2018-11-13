//--------------------MONGO-----------------------//
exports.mongoConfig = () => {
    const mongoose = require('mongoose');
    const credentials = require('./creds/mongo');
    let dev_db_url = credentials.connectionString;

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
        const credentials = require('./creds/firebase');
        // Fetch the service account key JSON file contents

        // Initialize the app with a service account, granting admin privileges
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
            databaseURL: "https://"+credentials.project_id+".firebaseio.com"
        });

        // As an admin, the app has access to read and write all data, regardless of Security Rules
        var db = admin.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        db.settings(settings);
        return db;
    }


//--------------------MSSQL-----------------------//
exports.mssqlConfig = {

    doConnect : callback => {
        var Connection = require('tedious').Connection;  
        const credentials = require('./creds/mssql');
        let connection = new Connection( credentials.sql);

        connection.on('connect', function(err) {  
            if (err) {
                console.log('Error ',err);
            }
            callback (null, connection);
        });  
    },

    doRelease : connection => {
        connection.close(err => {
            if (err) {
                console.error(err.message);
            }
        });
    }
}