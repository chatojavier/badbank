const config = require('./config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal');
const admin = require('./admin');
const path = require('path');
const { send } = require('process');

console.log(`NODE_ENV=${config.NODE_ENV}`);

// used to serve statics files from ./frontend/build directory
app.use(express.static('./frontend/build'));
app.use(cors());
app.use(express.json());

// React Routes
app.get(
	['/balance', '/login', '/deposit', '/withdraw', '/alldata'],
	(req, res) => {
		console.log('sending index.html');
		res.sendFile(path.resolve('./frontend/build', 'index.html'));
	}
);

// withdraw
app.patch('/init', (req, res) => {
	res.send('Please do an operation.');
});

// create user account
app.post('/account/create/', (req, res) => {
	// read token from header
	const idToken = req.headers.authorization;

	//verify token
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			console.log('Authentication Success!');
			// else create user
			dal.create(req.body.name, req.body.email, req.body.uid).then(
				(user) => {
					console.log('User created: ', user);
					res.send('User created!');
				}
			);
		})
		.catch((err) => {
			console.error('error: ', err);
			res.send('Error creating user');
		});
});

// all accounts
app.get('/account/all', (req, res) => {
	// else all user accounts
	dal.allUsers().then((users) => {
		res.send(users);
	});
});

// get a user by UID
app.get('/account/user/:uid', (req, res) => {
	// read token from header
	const idToken = req.headers.authorization;

	//verify token
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			console.log('Authentication Success!');
			// else all user accounts
			dal.getUser({ uid: req.params.uid }).then((user) => {
				const { name, balance, deposits, withdraws } = user;
				res.send({ name, balance, deposits, withdraws });
			});
		})
		.catch((err) => {
			console.error('error: ', err);
			res.send('Error creating user');
		});
});

// login account
app.post('/account/login', (req, res) => {
	// read token from header
	const idToken = req.headers.authorization;

	//verify token
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			console.log('Authentication Success!');
			// else confirm user and send data
			dal.loginAccount(req.body.uid).then((user) => {
				if (user === null) {
					res.send(false);
				} else {
					const { uid, name, email, balance, deposits, withdraws } =
						user;
					const newUser = {
						uid,
						name,
						email,
						balance,
						deposits,
						withdraws,
					};
					console.log('User logged: ', newUser);
					res.send(newUser);
				}
			});
		})
		.catch((err) => {
			console.error('error: ', err);
			res.send('Error creating user');
		});
});

// deposit
app.patch('/account/deposit', (req, res) => {
	// read token from header
	const idToken = req.headers.authorization;

	//verify token
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			console.log('Authentication Success!');
			// else updating deposit values
			dal.updateUser(
				{ uid: req.body.uid },
				{
					deposits: req.body.deposits,
					balance: req.body.balance,
				}
			).then((user) => {
				res.send(user);
			});
		})
		.catch((err) => {
			console.error('error: ', err);
			res.send('Error updating deposit values');
		});
});

// withdraw
app.patch('/account/withdraw', (req, res) => {
	// read token from header
	const idToken = req.headers.authorization;

	//verify token
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			console.log('Authentication Success!');
			// else updating withdraw values
			dal.updateUser(
				{ uid: req.body.uid },
				{
					withdraws: req.body.withdraws,
					balance: req.body.balance,
				}
			).then((user) => {
				res.send(user);
			});
		})
		.catch((err) => {
			console.error('error: ', err);
			res.send('Error updating withdraw values');
		});
});

// Test Connection
app.get('/testconnection', (req, res) => {
	dal.testConnection()
		.then((test) => {
			res.send(test);
			console.log('Connection OK');
		})
		.catch((err) => {
			console.error('Connection error');
			res.send(false);
		});
});

// 404 React route
app.all('*', (req, res) => {
	res.status(404).sendFile(path.resolve('./frontend/build', 'index.html'));
});

app.listen(config.PORT, config.HOST, function () {
	console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
