const express = require('express');
const router = express.Router();

let Article = require('../models/article');



router.get('/edit/:id', function(req, res) {
    Article.findById(req.params.id, function(error, article) {
        res.json({status: true, data: article});
    });
});

router.post('/add', function(req, res) {
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

// router.post('/update/:id', function(req, res) {
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

router.post('/update/:id', function(req, res) {
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
});

// router.delete('/:id', function(req, res) {
//     let query = {_id: req.params.id};

//     Article.remove(query, function(error) {
//         if(error) {
//             res.json({status: false, message: 'Could not delete article'});
//         } else {
//             res.json({status: true, message: 'Article deleted successfully'});
//         }
//     });
// });

router.get('/:id', function(req, res) {
    Article.findById(req.params.id, function(error, article) {
        res.json({status: true, data: article});
    });
});

router.delete('/:id', function(req, res) {
    Article.findByIdAndDelete({_id: req.params.id}, function(error) {
        if(error) {
            res.json({status: false, message: 'Could not delete article'});
        } else {
            res.json({status: true, message: 'Article deleted successfully'});
        }
    });
});

module.exports = router;