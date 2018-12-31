const db = require('../database/db');
const Auth = require('./login');
const validator = require('validator');
const bcrypt = require('bcrypt');
// @TODO this number is shared across files so I think this should be an env variable
const SALT_ROUNDS = 6;

async function validateUsername(username) {
	const sql = db.format(`SELECT COUNT(*) AS usernameExists
		FROM user
		WHERE username = ?`, [username]);

	try {
		const result = await db.fetchOne(sql);
		return new Promise((resolve, reject) => {
			resolve(result.usernameExists);
		});
	} catch(e) {
		return e;
	}
}

async function insertUser(username, password, email) {
	console.log('starting insert');
	const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

	const sql = db.format(`INSERT INTO user (username, password, user_email, group_id) VALUES (
			?, ?, ?, 2
		)`,
		[username, hashedPassword, email]
	);
	console.log(sql);
	try {
		const result = await db.query(sql);
		return new Promise((resolve, reject) => {
			resolve(result);
		});
	} catch(e) {
		return e;
	}
}

async function register(params) {
	const {
		username,
		password,
		passwordConf,
		email
	} = params;

	let valid = true;
	let message = 'Success';

	// make sure all our fields are here
	if (!username ||
		!password ||
		!passwordConf ||
		!email) {
		valid = false;
		message = 'Error: missing required field';
	}

	// check to make sure the username is unique
	if (await validateUsername(username)) {
		valid = false;
		message = 'Username not valid';
	}

	// make sure password and password confirmation are the same
	if (password !== passwordConf) {
		valid = false;
		message = 'Passwords do not match';
	}

	// validate the email
	if (!validator.isEmail(email)) {
		valid = false;
		message = 'Email is not a valid email';
	}

	// @TODO there should be a validation email sent here

	// register the user
	if (valid) {
		await insertUser(username, password, email);

		// here we should also perform the login process
		const authorized = await Auth.authorize({username, password});
		return new Promise((resolve, reject) => {
			resolve(authorized);
		})
	} else {
		console.log('rejecting register');
		return new Promise((resolve, reject) => {
			reject(message);
		});
	}
}

module.exports = {
	register
}
