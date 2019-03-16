//const Db = require('../database/db');
import Db from '../database/db';

async function index(userId) {
	const sql = `SELECT tag.*
		FROM tag
			LEFT JOIN note_tag ON note_tag.tag_id = tag.tag_id
			LEFT JOIN note ON note_tag.note_id = note.note_id
		WHERE tag.user_id = ${userId}
		GROUP BY tag_id`;

	const results = await Db.query(sql);
	const promises = results.map(async tag => {
		tag.associated_notes = await getNotesForTag(tag.tag_id);
		return tag;
	});
	return Promise.all(promises).then(tags => {
		return JSON.stringify({
			metadata: {
				numResults: tags.length,
			},
			tags,
		});
	});
}

async function getNotesForTag(tagId) {
	const sql = Db.format(
		`SELECT note_tag.note_id, note.title
		FROM note_tag
			LEFT JOIN note ON note.note_id = note_tag.note_id
		WHERE note_tag.tag_id = ?`, [tagId]
	);

	// @TODO better error handling
	try {
		const result = await Db.query(sql);
		return {
			metadata: {
				numRows: result.length,
			},
			notes: result,
		};
	} catch (e) {
		return e;
	}
}

async function getTagsForNote(noteId) {
	const sql = Db.format(`SELECT tag.tag_id, name, IF(note_tag.note_id IS NOT NULL, 1, 0) AS is_applied
		FROM tag
			LEFT JOIN note_tag ON tag.tag_id = note_tag.tag_id 
				AND note_id = ?`, 
		[noteId]
	);

	try {
		const result = await Db.query(sql);
		return result;
	} catch (e) {
		return e;
	}
}

async function getOne(tagId) {
	const sql = Db.format(`SELECT *
		FROM tag
		WHERE tag_id = ?`, [tagId]);

	const result = await Db.query(sql);

	return result;
}

async function create(userId, data) {
	const sql = Db.format(`INSERT INTO tag
		(user_id, name, description) VALUES (
			${userId}, 
			?,
			?)`, [
				data.name || '', 
				data.description || null
			]
	);

	const result = await Db.query(sql);
	const tag = await getOne(result.insertId);

	return new Promise((resolve, reject) => {
		if (result.affectedRows) {
			resolve(JSON.stringify({
				status: 'success',
				tag: tag[0],
			}));
		} else {
			reject(JSON.stringify({
				status: 'error',
			}));
		}
	});
}
 
async function update(tagId) {

}

async function remove(userId, tagId) {
	const sql = Db.format(`DELETE FROM tag
		WHERE user_id = ?
		AND tag_id = ?`, 
		[
			userId,
			tagId,
		]
	);
	const noteTagSql = Db.format(`DELETE FROM note_tag WHERE tag_id = ?`, [ tagId ]);

	const result = await Db.query(sql);
	if (result.affectedRows) {
		const noteTagResult = Db.query(noteTagSql);
	}
	return new Promise((resolve, reject) => {
		if (result.affectedRows) {
			resolve(JSON.stringify({
				status: 'success',
			}));
		} else {
			reject(JSON.stringify({
				status: 'error',
			}));
		}
	});
}

module.exports = {
	index,
	getNotesForTag,
	getTagsForNote,
	getOne,
	create,
	update,
	remove,
};
