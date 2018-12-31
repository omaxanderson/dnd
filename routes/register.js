var express = require('express');
var router = express.Router();
const controller = require('../controllers/register');


/* GET home page. */
router.get('/', function(req, res, next) {
	controller.register(req);
	res.send('register home');
});

// {
// 	success: [true, false],
// 	message: "some message",
// 	<optional> token: 'access token'
// }
/* POST register */
router.post('/', function(req, res, next) {
	controller.register(req.body)
		.then(result => {
			// this result should be an object and should have the user_id and token
			result = JSON.parse(result);
			res.send(JSON.stringify({
				success: true,
				message: result.message,
				token: result.token
			}));
		})
		.catch(err => {
			res.status(400);
			res.send(JSON.stringify({
				success: false,
				message: err
			}));
		});
});

module.exports = router;
