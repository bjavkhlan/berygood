/*
mongodb://heroku_9p3w91dx:b9v5uck9lcjp37jri3bk4vfi8n@ds133920.mlab.com:33920/heroku_9p3w91dx
mongodump -h localhost:27017 -d berygood -o ~/tmp/mongodump

mongorestore -h ds133920.mlab.com:33920 -d heroku_9p3w91dx -u heroku_9p3w91dx -p b9v5uck9lcjp37jri3bk4vfi8n ~/tmp/mongodump/berygood
*/
var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://heroku_9p3w91dx:b9v5uck9lcjp37jri3bk4vfi8n@ds133920.mlab.com:33920/heroku_9p3w91dx';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});



// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS



require('./students');
require('./lessons');
require('./curriculums');
require('./selections');
require('./users');
require('./teachers');
