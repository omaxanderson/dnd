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
	const sql = `CREATE TABLE access_token (
		token VARCHAR(50),
		user_id INT,
		PRIMARY KEY (token, user_id),
		INDEX token_index (token),
		UNIQUE INDEX user_id (user_id)
	)`;

	db.query(sql)
		.then(result =>{
			fs.appendFileSync(
				'migration_log', 
				`${path.basename(__filename)} UP has run successfully on ${ date.toLocaleString(options) }\n`
			);
			console.log(
				`${path.basename(__filename)} has run successfully on ${ date.toLocaleString(options) }`
			);
		})
		.catch(err => {
			console.log(err);
		});
}

function down() {
	const sql = `DROP TABLE access_token`;

	db.query(sql)
		.then(result => {
			fs.appendFileSync(
				'migration_log', 
				`${path.basename(__filename)} DOWN has run successfully on ${ date.toLocaleString(options) }\n`
			);
			console.log(`${path.basename(__filename)} has run successfully on ${ date.toLocaleString(options) }`);
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
