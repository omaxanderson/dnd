const express = require('express');
const router = express.Router();
//const campaignController = require('../controllers/campaign');
import { index, getOne } from '../controllers/campaign';

router.get('/', async (req, res, next) => {
	const result = await index(req.session.userId);
	res.send(JSON.stringify(result));
});

router.get('/:campaignId', async (req, res, next) => {
	const result = await getOne(req.session.userId, req.params.campaignId);
	res.send(JSON.stringify(result));
});

module.exports = router;
