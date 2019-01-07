var express = require('express');
var router = express.Router();
const noteController = require('../controllers/note');

/* GET all notes for a user */
router.get('/', async (req, res, next) => {
	const notes = await noteController.index(req.session.userId);
	res.send(notes);
});

/* POST a new note */
router.post('/', async (req, res, next) => {
	const result = await noteController.create(req.session.userId, req.body)
	res.send(result);
});

/* PUT update an existing note */
router.put('/:noteId', async (req, res, next) => {
	const result = await noteController.update(req.session.userId, 
		req.params.noteId,
		req.body
	);
	res.send(result);
});

module.exports = router;
