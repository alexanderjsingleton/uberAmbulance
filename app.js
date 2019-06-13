var http = require("http");
var express = require("express");
var consolidate = require("consolidate"); //1
var _ = require("underscore");
var bodyParser = require('body-parser');

var routes = require('./routes/routes.js'); //File that contains our endpoints
var mongoClient = require("mongodb").MongoClient;


const path = require('path');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';


var app = express();
app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

app.set('views', 'views'); //Set the folder-name from where you serve the html page. 
app.use(express.static('./public')); //setting the folder name (public) where all the static files like css, js, images etc are made available

app.set('view engine', 'html');
app.engine('html', consolidate.underscore); //Use underscore to parse templates when we do res.render


//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/uberAmbulance');
mongoose.set('debug', true);


// Models & Routes
require('./models/Users');
require('./config/passport');


//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

var server = http.Server(app);
var portNumber = 8000; //for locahost:8000

var io = require('socket.io')(server); //Creating a new socket.io instance by passing the HTTP server object

server.listen(portNumber, function() { //Runs the server on port 8000
    console.log('Server listening at port ' + portNumber);

    var url = 'mongodb://localhost:27017/uberAmbulance'; //Db name
    mongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.  
        console.log("Connected to Database");

        app.get('/citizen.html', function(req, res) { //a request to /citizen.html will render our citizen.html page
            //Substitute the variable userId in citizen.html with the userId value extracted from query params of the request.
            res.render('citizen.html', {
                userId: req.query.userId
            });
        });

        app.get('/ambulance.html', function(req, res) {
            res.render('ambulance.html', {
                userId: req.query.userId
            });
        });

        app.get('/data.html', function(req, res) {
            res.render('data.html');
        });

        io.on('connection', function(socket) { //Listen on the 'connection' event for incoming sockets
            console.log('A user just connected');

            socket.on('join', function(data) { //Listen to any join event from connected users
                socket.join(data.userId); //User joins a unique room/channel that's named after the userId 
                console.log("User joined room: " + data.userId);
            });

            routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
        });
    });
});

/* 1. Not all the template engines work uniformly with express, hence this library in js, (consolidate), is used to make the template engines work uniformly. Altough it doesn't have any 
modules of its own and any template engine to be used should be seprately installed!*/