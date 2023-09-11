const { db } = require('../config/dbconfig');

class User {
  constructor(username, xp) {
    this.username = username;
    this.xp = xp;
  }

  static findOrCreate(username) {
    return new Promise((resolve, reject) => {
      console.log("CHECK IF USER ", username, " EXISTS");
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          console.log("INSERTING NEW USER: ", username);
          db.run('INSERT INTO users (username, xp) VALUES (?, 0)', [username], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(new User(username, 0));
            }
          });
        } else {
          resolve(new User(row.username, row.xp));
        }
      });
    });
  }

  static saveUserXP(username, xp) {
    console.log("UPDATING USER ", (username) ," EXPERIENCE: ", xp);
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET xp = ? WHERE username = ?',
        [xp, username],
        function (err) {
          if (err) {
            console.error('Error updating User XP:', err);
            reject(err);
          } else {
            console.log(`User XP updated: ${this.changes}`);
            resolve(this.changes);
          }
        }
      );
    });
  }

  static deleteById(username) {
    return new Promise((resolve, reject) => {
      console.log("DELETING USER ", username);
      db.run('DELETE FROM users WHERE username = ?', [username], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = User;
