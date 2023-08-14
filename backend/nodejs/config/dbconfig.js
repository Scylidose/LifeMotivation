const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../../database/abitmotivation.db'));
module.exports = db;
