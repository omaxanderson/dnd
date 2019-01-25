const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');

/* GET all notes for a user */
router.get('/', async (req, res, next) => {
	const notes = await noteController.index(req.session.userId);
	res.send(notes);
});

/* GET a specific note */
router.get('/:noteId', async (req, res, next) => {
	try {
		const note = await noteController.getOne(req.session.userId, req.params.noteId);
		res.send(note);
	} catch (e) {
		console.log('oh noooo');
		console.log(err);
		res.send('bad');
	}
});

/* POST a new note */
router.post('/', async (req, res, next) => {
	const result = await noteController.create(req.session.userId, req.body);
	res.send(result);
});

/* PUT update an existing note */
router.put('/:noteId', async (req, res, next) => {
	const result = await noteController.update(req.session.userId, req.params.noteId, req.body);
	res.send(result);
});

/* DELETE remove a note */
router.delete('/:noteId', async (req, res, next) => {
	const result = await noteController.remove(req.session.userId, req.params.noteId);
	res.send(result);
});

/* DELETE tag from note */
router.delete('/:noteId/tags/:tagId', async (req, res, next) => {
	// need to do a check to make sure note and tag id's are numeric to prevent injection
	const result = await noteController.removeTagById(req.params.noteId, req.params.tagId);
	res.send(result);
});

/* DELETE tag from note */
router.post('/:noteId/tags/:tagId', async (req, res, next) => {
	// need to do a check to make sure note and tag id's are numeric to prevent injection
	const result = await noteController.addTagById(req.params.noteId, req.params.tagId);
	res.send(result);
});

module.exports = router;
