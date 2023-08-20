const db = require('../config/dbconfig');

class User {
  constructor(username) {
    this.username = username;
  }

  static findOrCreate(username) {
    return new Promise((resolve, reject) => {
      console.log("CHECK IF USER ", username, " EXISTS");
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          console.log("INSERTING NEW USER: ", username);
          db.run('INSERT INTO users (username) VALUES (?)', [username], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(new User(username));
            }
          });
        } else {
          resolve(new User(row.username));
        }
      });
    });
  }

  // Get all actions associated with a user
  async getActions(username) {
    console.log("GET ACTIONS FROM ", username);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM actions WHERE author = ?', [username], (err, rows) => {
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
