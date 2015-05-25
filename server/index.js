var uuid = require('node-uuid');
var fb = require("firebase")
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://preview.c9.io');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
});

//Require Requests File with App as parameter. All routes are in this file
var fbfuncs = require("./fb")(fb, uuid)
require("./requests")(app, fbfuncs);

app.listen(process.env.PORT);

console.log('Express server started on port %s', process.env.PORT);