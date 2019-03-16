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
	const sql = `CREATE TABLE campaign_note (
		campaign_id INT,
		note_id INT,
		PRIMARY KEY (campaign_id, note_id)
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
	const sql = `DROP TABLE campaign_note`;

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
