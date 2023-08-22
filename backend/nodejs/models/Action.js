const db = require('../config/dbconfig');

class Action {
  constructor(id, title, description, author, isGood, importance, daysOfWeek, difficulty, consistencyStreak, intendedDuration, finishedDateTime, realDuration, comment, publishedDateTime, objectiveId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.daysOfWeek = daysOfWeek;
    this.difficulty = difficulty;
    this.intendedDuration = intendedDuration;
    this.realDuration = realDuration;
    this.comment = comment;
    this.author = author;
    this.consistencyStreak = consistencyStreak;
    this.isGood = isGood;
    this.publishedDateTime = publishedDateTime;
    this.finishedDateTime = finishedDateTime;
    this.objectiveId = objectiveId;
  }

  static create(title, description, author, isGood, importance, daysOfWeek, difficulty, intendedDuration, objectiveId) {
    console.log("INSERTING ACTION: ", title, description, author, isGood, importance, daysOfWeek, difficulty, 0, intendedDuration, objectiveId);
    return new Promise((resolve, reject) => {
      const publishedDateTime = new Date().getTime();
      db.run(
        'INSERT INTO actions (title, description, author, isGood, importance, daysOfWeek, difficulty, consistencyStreak, comment, intendedDuration, publishedDateTime, objectiveId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, author, isGood, importance, daysOfWeek, difficulty, 0, "", intendedDuration, publishedDateTime, objectiveId],
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
              daysOfWeek,
              difficulty,
              0,
              intendedDuration,
              null,
              null,
              "",
              publishedDateTime,
              objectiveId
            ));
            console.log(`Row updated: ${this.changes}`);
          }
        }
      );
    });
  }

  static findAllByAuthor(author) {
    console.log("FETCHING ACTIONS BY AUTHOR: ", author);
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
            row.daysOfWeek,
            row.difficulty,
            row.consistencyStreak,
            row.intendedDuration,
            row.finishedDateTime,
            row.realDuration,
            row.comment,
            row.publishedDateTime,
            row.objectiveId
          ));
          resolve(actions);
        }
      });
    });
  }

  static findActionsByObjective(id) {
    console.log("FETCHING OBJECTIVE ACTIONS BY ID: ", id);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM actions WHERE objectiveId = ?', [id], (err, rows) => {
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
            row.intendedDuration,
            row.finishedDateTime,
            row.realDuration,
            row.comment,
            row.publishedDateTime,
            row.objectiveId
          ));
          resolve(actions);
        }
      });
    });
  }

  static findById(id) {
    console.log("FETCHING ACTIONS BY ID: ", id);
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
            row.daysOfWeek,
            row.difficulty,
            row.consistencyStreak,
            row.intendedDuration,
            row.finishedDateTime,
            row.realDuration,
            row.comment,
            row.publishedDateTime,
            row.objectiveId
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

  static resetActionById(id) {
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
