const mysql = require('mysql');
const dbconfig = require('./dbconfig');

class db {
	format(sql, params) {
		return mysql.format(sql, params);
	}

	query(sql) {
		return new Promise((resolve, reject) => {
			const connection = mysql.createConnection(dbconfig);
			connection.connect();

			connection.query(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
				connection.end();
			});
		});
	}

	fetchOne(sql) {
		return new Promise((resolve, reject) => {
			const connection = mysql.createConnection(dbconfig);
			connection.connect();

			connection.query(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows[0]);
				}
				connection.end();
			});
		});
	}
}

module.exports = new db();
