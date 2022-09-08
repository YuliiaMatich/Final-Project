var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const sassMiddleware = require("./lib/sass-middleware");
const cors = require('cors');
var logger = require('morgan');
const axios = require('axios');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const favoritesRouter = require('./routes/favorites');
const keywordRecipeSearch = require('./routes/keywordrecipessearch');
const cuisineSearch = require('./routes/cuisinesearch');
const mealTypeSearch = require('./routes/mealtypesearch');
const filterSearch = require('./routes/filtersearch');

var app = express();
app.use(cors())
app.use(cookieSession({
  name:'session',
  keys:['yuliia', 'david']
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/home', homeRouter);
app.use('/register', registerRouter(db));
app.use('/favorites', favoritesRouter(db));

app.use('/keywordrecipessearch', keywordRecipeSearch);
app.use('/cuisinesearch', cuisineSearch);
app.use('/mealtypesearch', mealTypeSearch);
app.use('/filtersearch', filterSearch);

module.exports = app;
