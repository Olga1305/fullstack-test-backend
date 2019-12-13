const express = require('express');
const Beer = require('../models/Beer');
const router = express.Router();

// GET 1st page beers
router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.find().limit(24);
    res.json(beers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
