const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../../database/abitmotivation.db'));

console.log("CREATING users TABLE IF NOT EXISTS");
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY
  )
`);

console.log("CREATING actions TABLE IF NOT EXISTS");
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
    finishedDateTime INTEGER,
    objectiveId      INTEGER NOT NULL,
    FOREIGN KEY (author)
       REFERENCES users (username) 
    FOREIGN KEY (objectiveId)
       REFERENCES objectives (id) 
  )
`);

console.log("CREATING objectives TABLE IF NOT EXISTS");
db.run(`
  CREATE TABLE IF NOT EXISTS objectives (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    priority INTEGER,
    complexity INTEGER,
    publishedDateTime INTEGER,
    intendedFinishDateTime INTEGER,
    realFinishDateTime INTEGER,
    author TEXT,
    FOREIGN KEY (author)
       REFERENCES users (username) 
  )
`);

module.exports = db;
