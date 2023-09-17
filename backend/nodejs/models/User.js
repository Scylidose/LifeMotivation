const { db } = require('../config/dbconfig');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

class User {
  constructor(username, xp, email) {
    this.username = username;
    this.xp = xp;
    this.email = email;
  }

  static fetchOne(usernameOrEmail) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ? OR email = ?", [usernameOrEmail, usernameOrEmail], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    })
  }

  static findOrCreate(username, email = '', password = '', salt = '') {
    return new Promise((resolve, reject) => {
      console.log("CHECK IF USER ", username, " EXISTS");
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          console.log("INSERTING NEW USER: ", username);
          db.run('INSERT INTO users (username, email, password_hash, salt, xp) VALUES (?, ?, ?, ?, 0)', [username, email, password, salt], function (err) {
            if (err) {
              reject(err);
            } else {

              const payload = {
                userId: this.lastID,
                username: username,
              };
              const token = jwt.sign(payload, secretKey, { expiresIn: '12h', algorithm: 'HS256' });
              resolve(token);
            }
          });
        } else {
          resolve(new User(row.username, row.xp, row.email));
        }
      });
    });
  }

  static saveUserXP(username, xp) {
    console.log("UPDATING USER ", (username), " EXPERIENCE: ", xp);
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
