var express = require('express');
var router = express.Router();
// include the controllers here
var Auth = require('../controllers/login');

// response message format
// {	
// 	success: [true, false],
// 	message: 'Your message here'
// }

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
	console.log(req.body);
	Auth.authorize(req.body)
		.then(result => {
			res.send(JSON.stringify({success: true, message: result}));
		})
		.catch(err => {
			res.status(400);
			res.send(JSON.stringify({success: false, message: err}));
		});
});

module.exports = router;
