const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../../database/abitmotivation.db'));

db.run(`
  CREATE TABLE IF NOT EXISTS actions (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    author TEXT,
    isGood INTEGER,
    importance INTEGER,
    frequency INTEGER,
    difficulty INTEGER,
    consistencyStreak INTEGER,
    intendedDuration INTEGER
  )
`);


module.exports = db;
