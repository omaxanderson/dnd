const db = require('../database/db');
const fs = require('fs');
const path = require('path');
const options = { 
	day: '2-digit', 
	month: '2-digit', 
	year: '2-digit', 
	hour: '2-digit', 
	minute: '2-digit', 
	second: '2-digit' 
};
const date = new Date();
function up() {
	const sql = `CREATE TABLE user (
		user_id INT PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(25) NOT NULL,
		password VARCHAR(100) NOT NULL,
		user_email VARCHAR(50),
		group_id INT NOT NULL
	)`;

	db.query(sql)
		.then(result =>{
			fs.appendFileSync(
				'migration_log', 
				`${__filename} has run successfully on ${ date.toLocaleString(options) }`
			);
			console.log(
				`${__filename} has run successfully on ${ date.toLocaleString(options) }`
			);
		})
		.catch(err => {
			console.log(err);
		});
}

function down() {
	const sql = `DROP TABLE user`;

	db.query(sql)
		.then(result => {
			fs.appendFileSync(
				'migration_log', 
				`${__filename} has run successfully on ${ date.toLocaleString(options) }`
			);
			console.log(`${__filename} has run successfully on ${ date.toLocaleString(options) }`);
		})
		.catch(err => {
			console.log(err);
		});
}

if (process.argv.length > 2) {
	if (process.argv[2] === 'up') {
		up();
	} else if (process.argv[2] === 'down') {
		down();
	}
} else {
	throw new Error('Migrate function required (up or down)');
}
