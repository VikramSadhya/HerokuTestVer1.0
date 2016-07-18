var express = require('express');
var connect = require('connect');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var port = Number(process.env.PORT || 5000);

app.use(function(req, res, next) {
  console.log(`${req.method} request for ${req.url}`);
  next();

});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.post('/postdata', function (req, res) {
  res.send("Hello World");
});

app.listen(port, function(err, req, res){
  if (err){
    console.log("Failed to start app at port:%s", port);
  } else {
    console.log("Project app running at port:%s", port);
  }
});