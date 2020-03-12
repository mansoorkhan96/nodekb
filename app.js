const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const expressValidator = require('express-validator');

mongoose.connect('mongodb://localhost/nodekb', { useNewUrlParser: true, useUnifiedTopology: true });
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

let Article = require('./models/article');

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
let articles = './routes/article';
app.use('/articles', articles);

app.listen(3000, function() {
    console.log('Server started at port 3000');
});