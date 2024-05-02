const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, '../public')));

router.get('/login', (req, res) => { res.sendFile(path.join(__dirname, '../public/views/login.html')); });

router.post('/login', (req, res) => {
	res.send('logged in');
});

router.get('/register', (req, res) => { res.sendFile(path.join(__dirname, '../public/views/register.html'));});

router.post('/register', async (req, res) => {
	// get form submission elements
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	
	// validate registration
	const registrationValidation = await validateRegistration(username, email, password, confirmPassword);

	if (!registrationValidation.isValid) {
		res.send(registrationValidation.message);
		return;
	}

	// register the user in database

	res.send('registered');
});

async function validateRegistration(username, email, password, confirmPassword) {
	var registrationValidation = { isValid: true, message: ''};

	if (await emailAlreadyExists(email)) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Email already exists';
		return registrationValidation;
	}

	if (password != confirmPassword) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Passwords do not match';
		return registrationValidation;
	}

	if (username.length < 3) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Username must be at least 3 characters';
		return registrationValidation;
	}

	if (username.length > 30) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Username must be at most 30 characters';
		return registrationValidation;
	}

	if (password.length < 8) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Password must be at least 8 characters';
		return registrationValidation;
	}

	if (password.length > 128) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Password must be at most 128 characters';
		return registrationValidation;
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	if (!passwordRegex.test(password)) {
		registrationValidation.isValid = false;
		registrationValidation.message = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
		return registrationValidation;
	}

	return registrationValidation;
}

async function emailAlreadyExists(email) {

}

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { validate } = require('uuid');


// // ================== MONGODB ==================

// const uri = "mongodb+srv://administrator:" + process.env.DB_PASSWORD + "@blitz1914-cluster-0.kgjehup.mongodb.net/?retryWrites=true&w=majority&appName=Blitz1914-Cluster-0"
// const mongoClient = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true
// 	}
// });

// async function addUser(username, email, password) {
// 	try {
// 		await mongoClient.connect();
// 		const db = mongoClient.db('Blitz1914');
// 		const collection = db.collection('Users');

// 		const user = {
// 			username: username,
// 			email: email,
// 			password: password
// 		};

// 		const result = await collection.insertOne(user);
// 		console.log(result);
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// // ================== CRYPTO ==================
// // function hashPassword(password) {
// // 	// bcrypt

// // }

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// router.get('/login', (req, res) => {
// 	if (req.session) {
// 		// user is logged in
// 		if (req.session.username) {
// 			res.redirect('/game');
// 			return;
// 		}
// 	}

// 	// default action: user needs to log in
// 	res.sendFile(path.join(__dirname, '../public/views/login.html'));
// });

// router.post('/logout', (req, res) => {
// 	req.session.destroy();
// 	res.redirect('/auth/login');
// });

// // router.post('/login', ApiRateLimiter, LoginController);

// router.post('/login', urlencodedParser, async (req, res) => {
// 	if ((!req.body) || ((!req.body.email) || (!req.body.password)))
// 		return res.sendStatus(400).json({ message: 'Invalid request' });

// 	const email = req.body.email;
// 	const password = req.body.password;

// 	try {
// 		mongoClient.connect();
// 		const db = mongoClient.db('Blitz1914');
// 		const collection = db.collection('Users');

// 		const user = await collection
// 			.findOne({ email: email });

// 		if (!user) {
// 			return res.status(401).json({ message: "User doesn't exist" });
// 		}

// 		const isMatch = await bcrypt.compare(password, user.password);

// 		if (!isMatch) {
// 			return res.status(401).json({ message: "Invalid credentials" });
// 		}

// 		// login success create NEW session
// 		req.session.username = user.username;

// 		return res.redirect('/');
// 	} catch(err) {
// 		console.error(err);
// 		return res.status(500).json({ message: "Internal server error" });
// 	}

// });

// router.get('/register', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../public/views/register.html'));
// });

// router.post('/register', urlencodedParser, async (req, res) => {
// 	if ((!req.body) || ((!req.body.username) || (!req.body.password) || (!req.body.email)))
// 		return res.sendStatus(400).json({ message: 'Invalid request' });

// 	emailValidity = await validateEmail(req.body.email);
// 	usernameValidity = await validateUsername(req.body.username);
// 	passwordValidity = await validatePassword(req.body.password);

// 	if (!emailValidity.valid) {
// 		return res.status(400).json({ message: emailValidity.message });
// 	}

// 	if (!usernameValidity.valid) {
// 		return res.status(400).json({ message: usernameValidity.message });
// 	}

// 	if (!passwordValidity.valid) {
// 		return res.status(400).json({ message: passwordValidity.message });
// 	}

// 	const email = req.body.email;
// 	const username = req.body.username;
// 	const password = req.body.password;

// 	// hash password
// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(password, salt);

// 	await addUser(username, email, hashedPassword);
	
// 	res.redirect('/auth/login');
// });

// async function validateEmail(email) {
// 	var emailValidity = {
// 		valid: true,
// 		message: ''
// 	}

// 	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// 	// check if email is valid 
// 	if (!emailRegex.test(email)) {
// 		emailValidity.valid = false;
// 		emailValidity.message = 'Invalid email';
// 		return emailValidity;
// 	}

// 	// check against existing emails in Users collection in Blitz1914 database
// 	try {
// 		await mongoClient.connect();
// 		const db = mongoClient.db('Blitz1914');
// 		const collection = db.collection('Users');

// 		const user = await collection
// 			.findOne({ email: email });

// 		if (user)
// 			emailValidity.valid = false;
// 			emailValidity.message = 'Email already exists';
// 	} catch(err) {
// 		console.error(err);
// 		emailValidity.valid = false;
// 		emailValidity.message = 'Internal server error ' + err;
// 	}
	
// 	return emailValidity;
// }

// async function validateUsername(username) {
// 	var usernameValidity = {
// 		valid: true,
// 		message: ''
// 	}

// 	if (username.length < 3) {
// 		usernameValidity.valid = false;
// 		usernameValidity.message = 'Username must be at least 3 characters';
// 	}
// 	if (username.length > 30) {
// 		usernameValidity.valid = false;
// 		usernameValidity.message = 'Username must be at most 30 characters';
// 	}

// 	return usernameValidity;
// }

// async function validatePassword(password) {
// 	var passwordValidity = {
// 		valid: true,
// 		message: ''
// 	}

// 	if (password.length < 8) {
// 		passwordValidity.valid = false;
// 		passwordValidity.message = 'Password must be at least 8 characters';
// 	}
// 	if (password.length > 128) {
// 		passwordValidity.valid = false;
// 		passwordValidity.message = 'Password must be at most 128 characters';
// 	}

// 	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// 	if (!passwordRegex.test(password)) {
// 		passwordValidity.valid = false;
// 		passwordValidity.message = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
// 	}

// 	return passwordValidity;
// }


// /**
// async function validateEmail(email) {
// 	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// 	// check against existing emails in Users collection in Blitz1914 database
// 	// if (email exists)
// 	// 	return false;
// 	try {
// 		await mongoClient.connect();
// 		const db = mongoClient.db('Blitz1914');
// 		const collection = db.collection('Users');

// 		const user = await collection
// 			.findOne({ email: email });

// 		if (user)
// 			return false;
// 	} catch(err) {
// 		console.error(err);
// 		return false;
// 	}

// 	return emailRegex.test(email);
// }

// function validateUsername(username) {
// 	if (username.length < 3)
// 		return false;
// 	if (username.length > 20)
// 		return false;

// 	return true;
// }

// function validatePassword(password) {
// 	if (password.length < 8)
// 		return false;
// 	if (password.length > 128)
// 		return false;

// 	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// 	return passwordRegex.test(password);
// }

// */

// module.exports = router;