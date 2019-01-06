const db = require('../database/db');

function getUserNotes(userId) {
	const sql = `SELECT *
		FROM note
		WHERE user_id = ${userId}`;

}

module.exports = {
	getUserNotes,
};
