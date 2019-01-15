const express = require('express');
const router = express.Router();

// include the controllers here
const Auth = require('../controllers/login');

// response message format
// {
// 	success: [true, false],
// 	message: 'Your message here'
// }

// @TODO this needs to be a POST eventually
/* GET home page. */
router.get('/', (req, res, next) => {
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
		.then(json => {
			const data = JSON.parse(json);
			// create a session
			console.log('adding accessToken to session');
			console.log(req.session);
			req.session.accessToken = data.token;
			req.session.userId = data.userId;
			console.log(req.session);

			res.send(JSON.stringify({
				success: true,
				message: data.message,
				token: data.token,
			}));
		})
		.catch(err => {
			console.log('error?!?!?!');
			res.status(400);
			res.send(JSON.stringify({ success: false, message: err }));
		});
});

module.exports = router;
