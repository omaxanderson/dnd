const mysql = require('mysql');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');
const SALT_ROUNDS = 8;

async function authorize(credentials) {
	console.log(credentials);
	const { username, password } = credentials;

	if (!username || !password) {
		return new Promise((resolve, reject) => {
			reject('Error: no username or password supplied!');
		});
	} 

	const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
	console.log('Hashed password: ' + hashedPassword);

	const sql = db.format(`SELECT user_id, password
		FROM user
		WHERE username = ?`,
		[username]
	);

	try {
		const result = await db.query(sql);
		// if nobody by that username, reject the promise
		if (!result.length) {
			return new Promise((resolve, reject) => {
				reject(`Username '${username}' not found.`)
			});
		}

		const match = await bcrypt.compare(password, result[0].password);

		// if there was a match, we need to generate an access token and store it
		console.log(match);
		if (match) {
			console.log('creating accesstoken');
			const token = uuid();
			const insertSql = db.format(`INSERT INTO access_token (token, user_id) 
				VALUES (?, ?)`, [token, result[0].user_id]);
			console.log(insertSql);
			const insertResult = await db.query(insertSql);
			console.log('res: ' + insertResult);
		}

		console.log(match ? 'Match!' : 'No match :(');

		return new Promise((resolve, reject) => {
			if (!username || !password) {
				reject('No username or password supplied!');
			} 
			match ? resolve('Success') 
				: reject('Incorrect password and username combination.');
		});
	} catch (e) {
		console.log(e);
		return e;
	}
}

module.exports = { 
	authorize 
};
