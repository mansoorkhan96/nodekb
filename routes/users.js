const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.post('/register', function(req, res) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(newUser.password, salt, function(error, hash) {
            if(error) {
                console.log(error);
            } else {
                newUser.password = hash;
                newUser.save(function(error) {
                    if(error) {
                        res.json({status: false, msg: 'Could not add user'});
                    } else {
                        res.json({status: true, msg: 'User added successfully'});
                    }
                });
            }
        });
    });
});



router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureFlash: true,
    })(req, res, next);
});

module.exports = router;