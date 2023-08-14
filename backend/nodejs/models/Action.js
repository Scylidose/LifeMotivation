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
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO actions (title, description, author, isGood, importance, frequency, difficulty, intendedDuration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, author, isGood, importance, frequency, difficulty, intendedDuration],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(new Action(this.lastID, title, description, author, isGood, importance, frequency, difficulty, 0, intendedDuration));
          }
        }
      );
    });
  }

  static findAllByAuthor(author) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM actions WHERE author = ?', [author], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const actions = rows.map(row => new Action(
            row.id,
            row.title,
            row.description,
            row.author,
            row.isGood,
            row.importance,
            row.frequency,
            row.difficulty,
            row.consistencyStreak,
            row.intendedDuration
          ));
          resolve(actions);
        }
      });
    });
  }
}

module.exports = Action;
