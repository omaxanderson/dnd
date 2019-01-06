var express = require('express');
var router = express.Router();

/* POST logout and destroy session */
router.post('/', (req, res, next) => {
	console.log(req.cookies);
	req.session.destroy();
	res.clearCookie('accessToken');
	res.redirect('/login');
});

module.exports = router;
