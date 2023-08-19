const db = require('../config/dbconfig');

class Action {
  constructor(id, title, description, author, isGood, importance, frequency, difficulty, consistencyStreak, intendedDuration, finishedDateTime, realDuration, linkedObjective, comment, publishedDateTime) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.frequency = frequency;
    this.difficulty = difficulty;
    this.intendedDuration = intendedDuration;
    this.realDuration = realDuration;
    this.linkedObjective = linkedObjective;
    this.comment = comment;
    this.author = author;
    this.consistencyStreak = consistencyStreak;
    this.isGood = isGood;
    this.publishedDateTime = publishedDateTime;
    this.finishedDateTime = finishedDateTime;
  }

  static create(title, description, author, isGood, importance, frequency, difficulty, intendedDuration) {
    console.log("INSERTING : ", title, description, author, isGood, importance, frequency, difficulty, 0, intendedDuration);
    return new Promise((resolve, reject) => {
      const publishedDateTime = new Date().getTime();
      db.run(
        'INSERT INTO actions (title, description, author, isGood, importance, frequency, difficulty, consistencyStreak, comment, intendedDuration, publishedDateTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, author, isGood, importance, frequency, difficulty, 0, "", intendedDuration, publishedDateTime],
        function (err) {
          if (err) {
            console.log("ROLLBACK");
            db.run('ROLLBACK'); // Roll back the transaction if there's an error
            reject(err);
          } else {
            resolve(new Action(
              this.lastID,
              title,
              description,
              author,
              isGood,
              importance,
              frequency,
              difficulty,
              0,
              intendedDuration,
              null,
              null,
              null,
              "",
              publishedDateTime
            ));
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
            row.intendedDuration,
            row.finishedDateTime,
            row.realDuration,
            row.linkedObjective,
            row.comment,
            row.publishedDateTime
          ));
          resolve(actions);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM actions WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          const action = new Action(
            row.id,
            row.title,
            row.description,
            row.author,
            row.isGood,
            row.importance,
            row.frequency,
            row.difficulty,
            row.consistencyStreak,
            row.intendedDuration,
            row.finishedDateTime,
            row.realDuration,
            row.linkedObjective,
            row.comment,
            row.publishedDateTime
          );
          resolve(action);
        }
      });
    });
  }

  static saveActionComment(id, comment) {
    console.log("UPDATING ACTION COMMENT:", id);

    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE actions SET comment = ? WHERE id = ?',
        [comment, id],
        function (err) {
          if (err) {
            console.error('Error updating action comment:', err);
            reject(err);
          } else {
            console.log(`Action comment updated: ${this.changes}`);
            resolve(this.changes);
          }
        }
      );
    });
  }

  static finishActionById(id, realDuration) {
    console.log("UPDATING FINISHED ACTION:", id);
    return new Promise((resolve, reject) => {
      const finishedDateTime = new Date().getTime();
      db.run(
        'UPDATE actions SET finishedDateTime = ?, realDuration = ? WHERE id = ?',
        [finishedDateTime, realDuration, id],
        async function (err) {
          if (err) {
            console.error('Error updating finished action:', err);
            reject(err);
          } else {
            console.log(`Finished action updated: ${this.changes}`);
            const action = await Action.findById(id);
            resolve(action);
          }
        }
      );
    });
  }


  static finishActionById(id) {
    console.log("UPDATING RESETTING ACTION:", id);
    return new Promise((resolve, reject) => {

      db.run(
        'UPDATE actions SET finishedDateTime = ?, realDuration = ? WHERE id = ?',
        [null, null, id],
        async function (err) {
          if (err) {
            console.error('Error updating resetting action:', err);
            reject(err);
          } else {
            console.log(`Resetting action updated: ${this.changes}`);
            const action = await Action.findById(id);
            resolve(action);
          }
        }
      );
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
