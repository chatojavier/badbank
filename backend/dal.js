const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	console.log('Connected successfully to db server');

	// connect to my project db
	db = client.db('myproject');
});

// create user account
function create(name, email, uid) {
	return new Promise((resolve, reject) => {
		const collection = db.collection('users');
		const doc = {
			uid,
			name,
			email,
			balance: 0,
			deposits: 0,
			withdraws: 0,
		};
		collection.insertOne(doc, { w: 1 }, (err, result) => {
			err ? reject(err) : resolve(result);
		});
	});
}

// all users
function allUsers() {
	return new Promise((resolve, reject) => {
		const customers = db
			.collection('users')
			.find({})
			.toArray((err, docs) => {
				err ? reject(err) : resolve(docs);
			});
	});
}

// get one user
function getUser(filter) {
	return new Promise((resolve, reject) => {
		db.collection('users').findOne(filter, (err, user) => {
			err ? reject(err) : resolve(user);
		});
	});
}

// login
function loginAccount(uid) {
	return new Promise((resolve, reject) => {
		const loginCustomer = db
			.collection('users')
			.findOne({ uid: uid }, (err, docs) => {
				err ? reject(err) : resolve(docs);
			});
	});
}

// update user
function updateUser(filter, updateData) {
	return new Promise((resolve, reject) => {
		db.collection('users').updateOne(
			filter,
			{ $set: updateData },
			(err, res) => {
				err ? console.error('err: ', err) : console.log('res: ', res);
				err ? reject(err) : resolve(res);
			}
		);
	});
}

// test db connection
function testConnection() {
	return new Promise((resolve, reject) => {
		try {
			const response = db.command({ ping: 1 });
			console.log('res: ', response);
			resolve(response);
		} catch (error) {
			console.error('DB error: ', error.message);
			reject(error);
		}
	});
}

module.exports = {
	create,
	allUsers,
	getUser,
	loginAccount,
	updateUser,
	testConnection,
};
