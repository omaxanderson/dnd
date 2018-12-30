var express = require('express');
var router = express.Router();
const controller = require('../controllers/register');


/* GET home page. */
router.get('/', function(req, res, next) {
	controller.register(req);
	res.send('register home');
});

/* POST register */
router.post('/', function(req, res, next) {
	controller.register(req.body)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			res.status = 400;
			res.send(err);
		});
});

module.exports = router;
