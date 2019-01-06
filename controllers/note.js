const db = require('../database/db');

async function getUserNotes(userId) {
	const sql = `SELECT *
		FROM note
		WHERE user_id = ${userId}`;
	console.log(sql);

	const notes = await db.query(sql);

	return JSON.stringify({
		metadata: {
			numResults: notes.length,
		},
		result: notes,
	});
}

module.exports = {
	getUserNotes,
};
