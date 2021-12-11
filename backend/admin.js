const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

// credential grants access to Firebase services
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
