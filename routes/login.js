var express = require('express');
var router = express.Router();
// include the controllers here
var Auth = require('../controllers/login');

// @TODO this needs to be a POST eventually
/* GET home page. */
router.get('/', function(req, res, next) {
	Auth.authorize(req.query)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			res.status(400);
			res.send(err);
		});
});

/* POST authorize based on credentials passed */
router.post('/', (req, res, next) => {
	Auth.authorize(req.query)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			res.status(400);
			res.send(err);
		});
});

module.exports = router;
