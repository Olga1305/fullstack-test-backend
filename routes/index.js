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

// GET beers by query
router.get('/:query', async (req, res, next) => {
  const { query } = req.params;
  try {
    if (query !== '') {
      const allBeers = await Beer.find();
      const beers = allBeers.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase())
        );
      });
      res.json(beers);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
