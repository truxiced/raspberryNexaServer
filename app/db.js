/* var level = require('level');  
var path = require('path');

var dbPath = process.env.DB_PATH || path.join(__dirname, 'devicesDB');  
var db = level(dbPath);

module.exports = db;  */
var path = require('path');
var Datastore = require('nedb');

var db = new Datastore({ filename: process.env.DB_PATH || path.join(__dirname, 'devicesDB') });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

module.exports = db;