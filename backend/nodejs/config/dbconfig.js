const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../../database/mock.db'), (err) => {
  if (err) {
    console.error('Error connecting to the SQLite database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Function to close the database connection
function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        reject(err);
      } else {
        console.log('Database connection closed.');
        resolve();
      }
    });
  });
}

// Function to create table in the database
const createTable = (tableName, schema) => {
  db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`, (err) => {
    if (err) {
      console.error(`Error creating ${tableName} table:`, err);
    } else {
      console.log(`${tableName} table created or already exists.`);
    }
  });
};

// Define the schema for each table
const usersSchema = 'username TEXT PRIMARY KEY';
const actionsSchema = `
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  importance INTEGER,
  daysOfWeek TEXT,
  frequency INTEGER,
  difficulty INTEGER,
  intendedDuration INTEGER,
  realDuration INTEGER,
  comment TEXT,
  author TEXT,
  consistencyStreak INTEGER,
  isGood INTEGER,
  publishedDateTime INTEGER,
  finishedDateTime INTEGER,
  objectiveId INTEGER NOT NULL,
  FOREIGN KEY (author) REFERENCES users (username),
  FOREIGN KEY (objectiveId) REFERENCES objectives (id)
`;
const objectivesSchema = `
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  priority INTEGER,
  complexity INTEGER,
  publishedDateTime INTEGER,
  intendedFinishDateTime INTEGER,
  realFinishDateTime INTEGER,
  author TEXT,
  FOREIGN KEY (author) REFERENCES users (username)
`;

// Create the tables
createTable('users', usersSchema);
createTable('actions', actionsSchema);
createTable('objectives', objectivesSchema);

module.exports = {
  db,
  closeDatabase
};