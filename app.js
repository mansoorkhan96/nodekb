const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', function(){
    console.log('Connected to MongoDB');
});

db.on('error', function(error) {
    console.log(error);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

let Article = require('./models/article');

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req, res) {
    Article.find({}, function(error, articles) {
        if(error) {
            console.log(error);
        } else {
            res.json(articles);
        }
    });
});


/**
 * Routes
 */
let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles', articles);
app.use('/users', users);

app.listen(3000, function() {
    console.log('Server started at port 3000');
});