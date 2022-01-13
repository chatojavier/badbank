require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	if (err) {
		throw err;
	} else {
		console.log('Connected! ', client);

		// database name
		const dbName = 'myproject';
		const db = client.db(dbName);

		// new user
		const name = 'user' + Math.floor(Math.random() * 10000);
		const email = name + '@mit.edu';

		//incert into customer table
		const collection = db.collection('customers');
		const doc = { name, email };
		collection.insertOne(doc, { w: 1 }, (err, result) => {
			console.log('Docuement insert');
		});

		const customers = db
			.collection('customers')
			.find()
			.toArray((err, docs) => {
				console.log('Collection: ', docs);

				// clean up
				client.close();
			});
	}
});
