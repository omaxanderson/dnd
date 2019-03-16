const express = require('express');
const router = express.Router();
import * as Campaign from '../controllers/campaign';

router.get('/', async (req, res, next) => {
	const result = await Campaign.index(req.session.userId);
	res.send(JSON.stringify(result));
});

router.get('/:campaignId', async (req, res, next) => {
	const result = await Campaign.getOne(req.session.userId, req.params.campaignId);
	res.send(JSON.stringify(result));
});

router.post('/', async (req, res, next) => {
	const result = await Campaign.create(req.session.userId, req.body);
	res.send(`{"msg":"works"}`);
});

module.exports = router;
