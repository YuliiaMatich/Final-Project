var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const keywordRecipeSearch = require('./routes/keywordrecipessearch');
const cuisineSearch = require('./routes/cuisinesearch');
const mealTypeSearch = require('./routes/mealtypesearch');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/keywordsearch', keywordRecipeSearch);
app.use('/cuisinesearch', cuisineSearch);
app.use('/mealtypesearch', mealTypeSearch);

module.exports = app;
