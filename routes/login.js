var express = require('express');
var router = express.Router();
// include the controllers here
var Auth = require('../controllers/login');

/* GET home page. */
router.get('/', async function(req, res, next) {
	const authorized = await Auth.authorize(req.query);
	console.log(authorized);
	res.send('login home');
});

/* POST authorize based on credentials passed */
router.post('/', (req, res, next) => {

});

module.exports = router;
