
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')({ origin: true, credentials: true });
const fetch = require('node-fetch');
const Beer = require('./models/Beer');

require('dotenv').config();


mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to: ', process.env.MONGO_URL);
  })
  .catch((error) => {
    console.error(error);
  });


// Fetch beers from Punk API and insert on MongoDB

const beers = [];

const cleanDB = async () => {
  await Beer.deleteMany({});
}

cleanDB();

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const result = async (arr) => {
  try {
    for (let i = 1; i < 6; i++) {
      const data = await getData(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`);
      arr = arr.concat(data);
    }
    return arr;
  } catch (error) {
    console.log(error);
  }
}
  
result(beers)  
  .then((beers) => beers.map(beer => {
    const newBeer = new Beer(beer);
    newBeer.save();
  }))
  .then((beers) => console.log('beers inserted on DB: ', beers.length))

// End of fetch and import


const indexRouter = require('./routes/index');

const app = express();
app.set('trust proxy', true);
app.use(cors);
app.options('*', cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'full-stack-test',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
