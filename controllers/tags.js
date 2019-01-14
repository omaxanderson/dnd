const db = require('../database/db');

async function index(userId) {

}

async function getTagsForNote(noteId) {
	const sql = db.format(`SELECT tag_id, name
		FROM tag
			JOIN note_tag ON tag.tag_id = note_tag.tag_id 
				AND note_id = ?`, 
		[noteId]
	);

	try {
		const result = await db.query(sql);
		return result;
	} catch (e) {
		return e;
	}
}

async function getOne(tagId) {

}

async function create(tagId) {

}
 
async function update(tagId) {

}

async function remove(tagId) {

}

module.exports = {
	index,
	getTagsForNote,
	getOne,
	create,
	update,
	remove,
};
