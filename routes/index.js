var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('api home');
});

/* POST home page. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	res.send('api home');
});

module.exports = router;
