const db = require('../database/db');
const tagsController = require('./tags');

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

	const notes = await db.query(sql);

	return JSON.stringify({
		metadata: {
			numResults: notes.length,
		},
		notes,
	});
}

async function addTagById(noteId, tagId) {
	const sql = `INSERT INTO note_tag
		VALUES (${tagId}, ${noteId})`;

	const result = await db.query(sql);

	return new Promise((resolve, reject) => {
		if (result.affectedRows) {
			resolve(JSON.stringify({
				status: 'success',
			}));
		} else {
			reject(JSON.stringify({
				status: 'error',
				message: `Tag id ${tagId} is not associated with note ${noteId}`,
			}));
		}
	});
}

async function removeTagById(noteId, tagId) {
	const sql = `DELETE FROM note_tag
		WHERE note_id = ${noteId}
		AND tag_id = ${tagId}`;

	const result = await db.query(sql);

	return new Promise((resolve, reject) => {
		if (result.affectedRows) {
			resolve(JSON.stringify({
				status: 'success',
			}));
		} else {
			reject(JSON.stringify({
				status: 'error',
				message: `Tag id ${tagId} is not associated with note ${noteId}`,
			}));
		}
	});
}

async function getOne(userId, noteId) {
	const notes = JSON.parse(await index(userId));
	const note = notes.notes.find(item => Number(item.note_id) === Number(noteId));
	if (!note) {
		return JSON.stringify({
			status: 'error',
			message: 'Note not found',
		});
	}

	// start building out the note object
	const tags = await tagsController.getTagsForNote(noteId);
	note.tags = tags;
	return JSON.stringify(note);
}

async function create(userId, reqBody) {
	const sql = db.format(`INSERT INTO note (user_id, content, title)
		VALUES (${userId}, ?, ?)`, [reqBody.content, reqBody.title]);
	console.log(sql);
	const result = await db.query(sql);
	if (result.affectedRows) {
		return JSON.stringify({
			affectedRows: result.affectedRows,
			noteId: result.lastInsertId,
		});
	}
		// @TODO need to fix this
		return 'bad resp';
}

async function update(userId, noteId, changes) {
	console.log(changes);
	if (!changes.content && !changes.title) {
		return JSON.stringify({
			error: 'No changes were submitted!',
		});
	}

	const noteOwnerId = await getNoteOwner(noteId);
	if (noteOwnerId !== userId) {
		return JSON.stringify({
			error: 'This note doesn\'t belong to you!',
		});
	}

	let updateSql = ' updated_at = CURRENT_TIMESTAMP ';
	if (changes.content) {
		updateSql += db.format(', content = ? ', [changes.content]);
	}
	if (changes.title) {
		updateSql += db.format(', title = ?', [changes.title]);
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
			error: 'This note doesn\'t belong to you!',
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
	}
	return JSON.stringify({
		affectedRows: result.affectedRows,
	});
}

module.exports = {
	index,
	getOne,
	create,
	update,
	remove,
	removeTagById,
	addTagById,
};
