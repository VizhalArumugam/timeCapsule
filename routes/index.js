// imports
const express = require('express');
const router = express.Router();

// a simple middleware to handle a 'GET' request for
// the index route
router.get('/', function(req, res, next) {
  res.send("Welcome To Time Capsule Backend!");
});

module.exports = router;
