var express = require('express');
var router = express.Router();
const notes = require('../controllers/notes')

router.get('/', 
async (req, res, next) => {
	
	
	return await notesController.index(
		req.session.userId
		
	);
});

router.get('/:noteId', 
async (req, res, next) => {
	
	const { noteId } = req.params;
	return await notesController.getOne(
		req.session.userId, noteId
		
	);
});

router.post('/', 
async (req, res, next) => {
	const { title, content } = req.body;
	
	return await notesController.create(
		req.session.userId
		, title, content
	);
});

router.put('/:noteId', 
async (req, res, next) => {
	const { changes } = req.body;
	const { noteId } = req.params;
	return await notesController.update(
		req.session.userId, noteId
		, changes
	);
});

router.delete('/:noteId', 
async (req, res, next) => {
	
	const { noteId } = req.params;
	return await notesController.remove(
		req.session.userId, noteId
		
	);
});
