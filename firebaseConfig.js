const admin = require('firebase-admin');

let serviceAccount;

// For production (Vercel)
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} else {
    // For local development
    serviceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://ecommerce-backend-c9834-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;