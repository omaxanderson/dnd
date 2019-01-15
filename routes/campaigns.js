const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign');

router.get('/', async (req, res, next) => {
	const result = await campaignController.index(req.session.userId);
	res.send(result);
});

router.get('/:campaignId', async (req, res, next) => {
	const result = await campaignController.getOne(req.session.userId, req.params.campaignId);
	res.send(result);
});

module.exports = router;
