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
}

module.exports = User;
