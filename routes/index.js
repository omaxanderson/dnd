const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.send('api home');
});

/* POST home page. */
router.post('/', (req, res, next) => {
	console.log(req.body);
	res.send('api home');
});

module.exports = router;
