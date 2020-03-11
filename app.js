const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', function(){
    console.log('Connected to MongoDB');
});

db.on('error', function(error) {
    console.log(error);
});

const app = express();

let Article = require('./models/article');

app.listen(3000, function() {
    console.log('Server started at port 3000');
});