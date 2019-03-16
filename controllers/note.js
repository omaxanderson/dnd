// const db = require('../database/db');
import Db from '../database/db';
const tagsController = require('./tags');

async function getNoteOwner(noteId) {
	const noteOwner = await Db.fetchOne(Db.format(`SELECT user_id
		FROM note
		WHERE note_id = ?`, [noteId]));
	return noteOwner.user_id;
}

// @TODO we want to be able to choose which fields we want
// for example, the note listing doesn't need content which takes up the most
// space, so it would be nice to be able to omit that
async function index(userId) {
	const sql = `SELECT 
			note.note_id AS noteId, 
			note.created_at AS createdAt,
			note.updated_at AS updatedAt,
			note.title AS title,
			note.content AS content,
			GROUP_CONCAT(CONCAT(tag.tag_id, ':', tag.name) SEPARATOR ',') AS tags
		FROM note
			LEFT JOIN note_tag USING (note_id)
			LEFT JOIN tag USING (tag_id)
		WHERE note.user_id = ${userId}
		AND active = 1
		GROUP BY note.note_id`;

	let result = await Db.query(sql);
	result.forEach(item => {
		result.test = 'heyyy';
	});

	// parse the tags
	const notes = result.map(item => {
		if (!item.tags) {
			return {...item};
		}
		const tags = item.tags.split(',').map(tag => {
			const pieces = tag.split(':');
			return { noteId: pieces[0], name: pieces[1] };
		});
		return {
			...item,
			tags
		};
	});

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

	const result = await Db.query(sql);

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

	const result = await Db.query(sql);

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
	const note = notes.notes.find(item => Number(item.noteId) === Number(noteId));
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
	const sql = Db.format(`INSERT INTO note (user_id, content, title)
		VALUES (${userId}, ?, ?)`, [reqBody.content, reqBody.title]);
	console.log(sql);
	const result = await Db.query(sql);
	console.log(result);
	if (result.affectedRows) {
		return JSON.stringify({
			affectedRows: result.affectedRows,
			noteId: result.insertId,
		});
	}
	// @TODO need to fix this
	return 'bad resp';
}

async function update(userId, noteId, changes) {
	console.log(userId);
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

	const sql = Db.format(`UPDATE note
		SET updated_at = CURRENT_TIMESTAMP,
			content = ?,
			title = ?
		WHERE note_id = ?
		AND user_id = ?`, [changes.content, changes.title, noteId, userId]
	);

	const result = await Db.query(sql);
	console.log(result);

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
	const sql = Db.format(`UPDATE note
		SET active = 0
		WHERE note_id = ?
		AND user_id = ?`, [noteId, userId]);
	const result = await Db.query(sql);
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
