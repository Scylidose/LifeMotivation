const db = require('../config/dbconfig');

class Action {
  constructor(id, title, description, author, isGood, importance, frequency, difficulty, consistencyStreak, intendedDuration) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.isGood = isGood;
    this.importance = importance;
    this.frequency = frequency;
    this.difficulty = difficulty;
    this.consistencyStreak = consistencyStreak;
    this.intendedDuration = intendedDuration;
  }

  static create(title, description, author, isGood, importance, frequency, difficulty, intendedDuration) {
    console.log("INSERTING : ", title, description, author, isGood, importance, frequency, difficulty, 0, intendedDuration);
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO actions (title, description, author, isGood, importance, frequency, difficulty, consistencyStreak, intendedDuration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, author, isGood, importance, frequency, difficulty, 0, intendedDuration],
        function (err) {
          if (err) {
            console.log("ROLLBACK");
            db.run('ROLLBACK'); // Roll back the transaction if there's an error
            reject(err);
          } else {
            resolve(new Action(this.lastID, title, description, author, isGood, importance, frequency, difficulty, 0, intendedDuration));
            console.log(`Row updated: ${this.changes}`);
          }
        }
      );
    });
  }

  static findAllByAuthor(author) {
    console.log("FETCHING....");
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM actions WHERE author = ?', [author], (err, rows) => {
        if (err) {
          throw err;
        } else {
          const actions = rows.map(row => new Action(row.id, row.title, row.description, row.author, row.isGood, row.importance, row.frequency, row.difficulty, row.consistencyStreak, row.intendedDuration));
          resolve(actions);
        }
      });
    });
  }

  static deleteById(id) {
    console.log("DELETING ACTION:", id);
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM actions WHERE id = ?',
        [id],
        function (err) {
          if (err) {
            console.error('Error deleting action:', err);
            reject(err);
          } else {
            console.log(`Action deleted: ${this.changes}`);
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Action;
