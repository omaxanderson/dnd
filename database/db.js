import mysql from 'mysql';
import dbconfig from './dbconfig';

export default class db {
	static format(sql, params) {
		return mysql.format(sql, params);
	}

	static query(sql) {
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

	static fetchOne(sql) {
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
