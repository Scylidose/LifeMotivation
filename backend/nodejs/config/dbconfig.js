const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../../database/abitmotivation.db'));

db.run(`
  CREATE TABLE IF NOT EXISTS actions (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    importance INTEGER,
    daysOfWeek TEXT,
    difficulty INTEGER,
    intendedDuration INTEGER,
    realDuration INTEGER,
    linkedObjective TEXT,
    comment TEXT,
    author TEXT,
    consistencyStreak INTEGER,
    isGood INTEGER,
    publishedDateTime INTEGER,
    finishedDateTime INTEGER
  )
`);


module.exports = db;
