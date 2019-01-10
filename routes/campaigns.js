var express = require('express');
var router = express.Router();
const campaignController = require('../controllers/campaign');

router.get('/', async (req, res, next) => {
	const result = await campaignController.index(req.session.userId);
	res.send(result);
});

module.exports = router;
