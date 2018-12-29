const mysql = require('mysql');
const db = require('../database/db');
const bcrypt = require('bcrypt');

async function authorize(credentials) {
	console.log(credentials);
	const { username, password } = credentials;

	const sql = db.format(`SELECT *
		FROM user
		WHERE username = ? 
		AND password = ?`,
		[username, password]
	);
	const result = await db.query(sql);

	return new Promise((resolve, reject) => {
		if (!username || !password) {
			reject('Error: no username or password supplied!');
		} 
		resolve(result);
	});
}

module.exports = { 
	authorize 
};
