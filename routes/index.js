const express = require('express');
const Beer = require('../models/Beer');
const router = express.Router();

const pageSize = 20;

// GET all beers (just in case)
router.get('/', async (req, res, next) => {  
  try {
    const beers = await Beer.find();
    res.json(beers);
  } catch (error) {
    next(error);
  }
});

// GET paginated beers
router.get('/page/:currentPage', async (req, res, next) => {
  const { currentPage } = req.params;
  const skip = (currentPage * pageSize) - pageSize;
  try {
    const beers = await Beer.find().limit(pageSize).skip(skip);
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

// GET single beer
router.get('/single/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const beer = await Beer.findOne({ id });
    res.json(beer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
