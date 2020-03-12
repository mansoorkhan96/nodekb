const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

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

app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(error, article) {
        res.json({status: true, data: article});
    });
});

app.get('/article/edit/:id', function(req, res) {
    Article.findById(req.params.id, function(error, article) {
        res.json({status: true, data: article});
    });
});

app.post('/articles/add', function(req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    article.save(function(error) {
        if(error) {
            res.json({status: false, message: 'Could not add article'});
        } else {
            res.json({status: true, message: 'Article added successfully'});
        }
    });
});

// app.post('/article/update/:id', function(req, res) {
//     let article = {};
//     article.title = req.body.title;
//     article.author = req.body.author;
//     article.body = req.body.body;

//     let query = {_id: req.params.id};

//     Article.update(query, article, function(error) {
//         if(error) {
//             res.json({status: false, message: 'Could not update article'});
//         } else {
//             res.json({status: true, message: 'Article updated successfully'});
//         }
//     })
// })

app.post('/article/update/:id', function(req, res) {
    Article.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    }, function(error, article) {
        if(error) {
            res.json({status: false, message: 'Could not update article'});
        } else {
            res.json({status: true, message: 'Article updated successfully'});
        }
    })
})

app.listen(3000, function() {
    console.log('Server started at port 3000');
});