var express = require('express');
var router = express.Router();
const noteController = require('../controllers/note');

router.get('/', (req, res, next) => {
	console.log('notes!!!');
	console.log(req.session.userId);

	res.send('notes!!');
});

module.exports = router;
