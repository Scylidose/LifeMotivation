const db = require('../config/dbconfig');

class User {
  constructor(id, username, courriel, password) {
    this.id = id;
    this.username = username;
    this.courriel = courriel;
    this.password = password;
  }

  static findOrCreate(username, courriel, password) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          db.run('INSERT INTO users (username, courriel, password) VALUES (?, ?, ?)', [username, courriel, password], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(new User(this.lastID, username, courriel, password));
            }
          });
        } else {
          resolve(new User(row.id, row.username, row.courriel, row.password));
        }
      });
    });
  }

  // Get all actions associated with a user
  async getActions() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM actions WHERE author = ?', [this.id], (err, rows) => {
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
            row.daysOfWeek,
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

module.exports = User;
