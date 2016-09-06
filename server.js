var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var favicon = require('express-favicon');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(__dirname + '/public/favicon.ico'));

var port = Number(process.env.PORT || 8000);

var pool = mysql.createPool({
host:'uoa25ublaow4obx5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
user:'bikjev1qj9iiyqo8',
password:'npkb2rqdf9m6rdfq',
database:'s3zaxupkdhjfrv79',
port: 3306,
connectionLimit: 10
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/about.html');
});

app.post('/resetdatabase', function (req, res) {
  pool.getConnection(function(err,connection){
  connection.query('TRUNCATE table beacon', function(err) {
    if(err){
        throw err;
      } else {
          res.sendFile(__dirname + '/public/about.html');
        }
    });
  connection.release();
});
});

app.post('/insertdata', function(req,res){
 pool.getConnection(function(err,connection){
  var data ={ bname: req.body.bname,
      balias: req.body.balias,
      location: req.body.bloc
  };
  connection.query('INSERT INTO beacon SET ?', data, function(err) {
    if(err){
        throw err;
      } else {
          res.sendFile(__dirname + '/public/about.html');                
        }
    });
  connection.release();
});
});

app.set('view engine', 'ejs');
var obj = {};

app.post('/beacons', function(req, res){
  pool.getConnection(function(err,connection){
  connection.query('SELECT * FROM beacon', function(err, result) {
    if(err){
      throw err;
    } else {
      obj = {checkin: result};
      res.render('layout', obj);                
    }
  });
  connection.release();
});
});

app.listen(port, function(err, req, res){
  if (err){
    console.log("Failed to start app at port:%s", port);
  } else {
    console.log("Project app running at port:%s", port);
  }
});