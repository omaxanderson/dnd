const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');
// @TODO this whole thing needs to actually be implemented, this is basically a skeleton

router.get('/', async (req, res, next) => {
	// @TODO need more client-side input validation
	console.log('tag index');
	try {
		const result = await tagsController.index(req.session.userId);
		res.send(result);
	} catch (e) {
		res.status(500);
		res.send(e);
	}
});

router.get('/:tagId', async (req, res, next) => {
	try {
		const result = await tagsController.getOne(req.session.userId);
		res.send(result);
	} catch (e) {
		res.status(500);
		res.send(e);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const result = await tagsController.create(req.session.userId, req.body);
		res.send(result);
	} catch (e) {
		res.status(500);
		res.send(e);
	}
});

router.put('/', async (req, res, next) => {
	try {
		const result = await tagsController.update(req.session.userId);
		res.send(result);
	} catch (e) {
		res.status(500);
		res.send(e);
	}
});

router.delete('/', async (req, res, next) => {
	try {
		const result = await tagsController.delete(req.session.userId);
		res.send(result);
	} catch (e) {
		res.status(500);
		res.send(e);
	}
});

module.exports = router;
