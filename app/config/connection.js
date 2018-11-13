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
        // Fetch the service account key JSON file contents
        var serviceAccount = {
            "type": "service_account",
            "project_id": "fir-app-f846f",
            "private_key_id": "ed738424714a48b38e896055e10dd57989f788d5",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCo3aR2hwlnu39u\nQHdoX2hHTW58SElfA13vsJmN3NrSXzRpXr+7gJN22yK0OwTopX973k0tAqoBfRt8\nPP68c9Bh/rtfJ81m3VdC1TedwZTe8lTnP58TL9G1p4hesf+5YczRB6fE4xU17sJ3\nlK3zOC0G/qPqnlQlh1DTRHyC2K2bBFh0NnfgSjizGC2nx9D5ZdUdAx9Q1xB6KI99\nuKDXE2uoRiWo5jfaZp3748wq6VcidLPFAYOIhyy0o8HqM5mAm3RzhUbmhhbEwGRy\nCalz1+04uB9EDzmzSq2IX39/S9E3k+RnSdKU9A2voz5eA1ck2J6eWfjLjeGEl6fF\nBhrO5O8dAgMBAAECggEADFdeggHD0IlQeoigRsgqQS50iQVoxKvkp/Qv1MFeW1+f\n30+QaFiw7k/STSUUam2l+oc4UWDPd0UNxtpXrQLd05D1YAfy/WCR1GLsKfhliUG2\nriE6iVbGVyYDqRVjNh44BNLavQtHl+XM3/EazBq/7QdGiDVtZZdqcyD0j0TcszvT\nTCqVfo+tDXKZAab8Zn9J0FdqkGoGkdcsPCF53L+MBV13CshgSPcLUGef4J3ePJSi\nXOmDxCHkUOo/rW/cmrXNWcka9NV2XZpKH3eGd2WUCzlymLhLMn2rnj1vowzw38oY\niIe+gYyZQX7bWVwoDCeXk72nz1GkIvNJw0mDTzL/wQKBgQDb39eyjC8In9Qh4hdz\nKar/oEgDvtcTEoTfro8JNJ0hw3BqI6aD2uDcealOk1tjfKM8KFdrF1tjOR97GEbq\nVfa8zRuYOYlbLmg418V6sZnErjQPIwJS975LNTeJ4wZsxOsUAsqVHfELfP/+v87/\nAfFxj2hDDh0XdIuFHuIQkktKcQKBgQDEnFKRLEctvBekSGNzjpM2SMRJvbBxEwbL\nOtc/HLHJ/x+TkEEyMHs/TV8NUdX0XzzUjB6qckIfUChd/28K7Lp8ReoCBdl7Vr3O\n5oU3ELPhsmXSHrjrpMA0k+oyjR1Bs/mXyvp462GRuDL/U2c0k5dtciZYUEZc0XRW\n5Al/aTaNbQKBgHTtYSPOcOTBOmqadaYErq8qaaG0R2QZIRhjGCXpGPbvnESVmOPd\n7l7RRDxJGPybN6OyQGrvDOaDZj5r9qp/9KsK2HXngyg+UaaI+Lf64q85hO3XzFCa\n91O/hT2KwcvuHKWTpnAOcDWP0AOFtWrfearOfL/MLaRfkiLE/auaYPfBAoGASShp\nyL8TFT+CBI0zBFKvEGnvMAk3WDveMU0JvuAsf59A3qW0vLoxghKGJeynkjDF78jb\nuEyfsgsfmipr5ULE+W0CcBJBJJXYNt6r/xtl87twC8mGwZgiNO49HOZJVqNjYkoS\n/V+IhLJnt34PTw8EL6NkBUSJigweIB7mMdSyidkCgYAggO1KeQF12CkNnGEUWOGe\nM4zsao7pzgYY9/k8cv2Q+KU/4oYe1XytksMi5VfTsddV0i9I6PY/fwckhDH5ySVf\nMcdozKA0UAk28Eue4eRHPh0R/7JMYypTsiJD1UHKlGRjTf0yGiOD9JBSx6qz70aA\nOTMztDp5LrKkZ+/ZYIB9/w==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-y0oj1@fir-app-f846f.iam.gserviceaccount.com",
            "client_id": "113650817167384739075",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y0oj1%40fir-app-f846f.iam.gserviceaccount.com"
        };

        // Initialize the app with a service account, granting admin privileges
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
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