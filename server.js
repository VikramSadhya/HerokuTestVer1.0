var express = require('express');
var connect = require('connect');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var google = require('googleapis');
var proximitybeacon = google.proximitybeacon('v1beta1');

var port = Number(process.env.PORT || 5000);

app.use(function(req, res, next) {
  console.log(`${req.method} request for ${req.url}`);
  next();

});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


app.post('/postdata', function (req, res) {
 proximitybeacon.beaconinfo.getforobserved("https://proximitybeacon.googleapis.com/v1beta1/beaconinfo:getforobserved?key=AIzaSyAru8xqtOm729RWjHjHN-6vL-9FhnEqDWI", function(data){
  res.send(data);
});
});

app.listen(port, function(err, req, res){
  if (err){
    console.log("Failed to start app at port:%s", port);
  } else {
    console.log("Project app running at port:%s", port);
  }
});

