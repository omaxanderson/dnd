const mysql = require('mysql');
const db = require('../database/db');
const bcrypt = require('bcrypt');
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
				reject(JSON.stringify({
					message: JSON.stringify({message: `Username ${username} not found.`})
				}));
			});
		}

		const match = await bcrypt.compare(password, result[0].password);

		console.log(match ? 'Match!' : 'No match :(');

		return new Promise((resolve, reject) => {
			if (!username || !password) {
				reject(JSON.stringify({message: 'Error: no username or password supplied!'}));
			} 
			match ? resolve(JSON.stringify({ message: 'Success' })) 
				: reject(JSON.stringify({
					message: 'Incorrect password and username combination.'}));
		});
	} catch (e) {
		return e;
	}
}

module.exports = { 
	authorize 
};
