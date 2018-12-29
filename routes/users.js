var express = require('express');
var router = express.Router();
const db = require('../database/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users home');
});

module.exports = router;
