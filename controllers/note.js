const db = require('../database/db');

async function getNoteOwner(noteId) {
	const noteOwner = await db.fetchOne(db.format(`SELECT user_id
		FROM note
		WHERE note_id = ?`, [noteId]));
	return noteOwner.user_id;
}

async function index(userId) {
	const sql = `SELECT *
		FROM note
		WHERE user_id = ${userId}
		AND active = 1`;
	console.log(sql);

	const notes = await db.query(sql);

	return JSON.stringify({
		metadata: {
			numResults: notes.length,
		},
		result: notes,
	});
}

async function create(userId, reqBody) {
	const sql = db.format(`INSERT INTO note (user_id, content, title)
		VALUES (${userId}, ?, ?)`, [reqBody.content, reqBody.title]);
	console.log(sql);
	const result = await db.query(sql);
	if (result.affectedRows) 
	return JSON.stringify({
		affectedRows: result.affectedRows,
		noteId: result.lastInsertId,
	});
}

async function update(userId, noteId, changes) {
	if (!changes.content && !changes.title) {
		return JSON.stringify({
			error: 'No changes were submitted!',
		});
	}

	const noteOwnerId = await getNoteOwner(noteId);
	if (noteOwnerId !== userId) {
		return JSON.stringify({
			error: `This note doesn't belong to you!`,
		});
	}

	let updateSql = ` updated_at = CURRENT_TIMESTAMP `;
	if (changes.content) {
		updateSql += db.format(`, content = ? `, [changes.content]);
	}
	if (changes.title) {
		updateSql += db.format(`, title = ?`, [changes.title]);
	}

	const sql = db.format(`UPDATE note
		SET ${updateSql}
		WHERE note_id = ?
		AND user_id = ?`, [noteId, userId]); 
	console.log(sql);

	const result = await db.query(sql);

	return JSON.stringify({
		affectedRows: result.affectedRows,
	});
}

async function remove(userId, noteId) {
	if (await getNoteOwner(noteId) !== userId) {
		return JSON.stringify({
			error: `This note doesn't belong to you!`,
		});
	}
	const sql = db.format(`UPDATE note
		SET active = 0
		WHERE note_id = ?
		AND user_id = ?`, [noteId, userId]);
	const result = await db.query(sql);
	if (!result.affectedRows) {
		return JSON.stringify({
			error: `Note ID ${noteId} not found!`,
		});
	} else {
		return JSON.stringify({
			affectedRows: result.affectedRows,
		});
	}

}

module.exports = {
	index,
	create,
	update,
	remove,
};
