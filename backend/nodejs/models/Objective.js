const { db } = require('../config/dbconfig');

class Objective {
    constructor(id, title, description, author, priority, complexity, publishedDateTime, intendedFinishDateTime, realFinishDateTime) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.priority = priority;
        this.complexity = complexity;
        this.publishedDateTime = publishedDateTime;
        this.intendedFinishDateTime = intendedFinishDateTime;
        this.realFinishDateTime = realFinishDateTime;
    }

    static create(title, description, author, priority, complexity, intendedFinishDateTime) {
        console.log("INSERTING OBJECTIVE : ", title, description, author, priority, complexity, intendedFinishDateTime);
        return new Promise((resolve, reject) => {
            const publishedDateTime = new Date().getTime();
            db.run(
                'INSERT INTO objectives (title, description, author, priority, complexity, publishedDateTime, intendedFinishDateTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, description, author, priority, complexity, publishedDateTime, intendedFinishDateTime],
                function (err) {
                    if (err) {
                        console.log("ROLLBACK");
                        db.run('ROLLBACK'); // Roll back the transaction if there's an error
                        reject(err);
                    } else {
                        resolve(new Objective(
                            this.lastID,
                            title,
                            description,
                            author,
                            priority,
                            complexity,
                            publishedDateTime,
                            intendedFinishDateTime,
                            null,
                        ));
                        console.log(`Row updated: ${this.changes}`);
                    }
                }
            );
        });
    }

    static edit(id, title, description, author, priority, complexity, intendedFinishDateTime) {
        console.log("UPDATING OBJECTIVE : ", id, title, description, author, priority, complexity, intendedFinishDateTime);
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE objectives SET title = ?, description = ?, author = ?, priority = ?, complexity = ?, intendedFinishDateTime = ? WHERE id = ?',
                [title, description, author, priority, complexity, intendedFinishDateTime, id],
                function (err) {
                    if (err) {
                        console.log("ROLLBACK");
                        db.run('ROLLBACK'); // Roll back the transaction if there's an error
                        reject(err);
                    } else {
                        console.log(`Row updated: ${this.changes}`);
                        resolve(this.changes);
                    }
                }
            );
        });
    }

    static findById(id) {
        console.log("FETCHING OBJECTIVE BY ID: ", id);
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM objectives WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    const objective = new Objective(
                        row.id,
                        row.title,
                        row.description,
                        row.author,
                        row.priority,
                        row.complexity,
                        row.publishedDateTime,
                        row.intendedFinishDateTime,
                        row.realFinishDateTime
                    );
                    resolve(objective);
                }
            });
        });
    }

    static findAllByAuthor(author) {
        console.log("FETCHING OBJECTIVE FOR ", author);
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM objectives WHERE author = ?', [author], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const objective = rows.map(row => new Objective(
                        row.id,
                        row.title,
                        row.description,
                        row.author,
                        row.priority,
                        row.complexity,
                        row.publishedDateTime,
                        row.intendedFinishDateTime,
                        row.realFinishDateTime
                    ));
                    resolve(objective);
                }
            });
        });
    }

    static finishObjectiveById(id) {
        console.log("UPDATING FINISHED OBJECTIVE:", id);
        return new Promise((resolve, reject) => {
            const realFinishDateTime = new Date().getTime();
            db.run(
                'UPDATE objectives SET realFinishDateTime = ? WHERE id = ?',
                [realFinishDateTime, id],
                async function (err) {
                    if (err) {
                        console.error('Error updating finished objective:', err);
                        reject(err);
                    } else {
                        console.log(`Finished objective updated: ${this.changes}`);
                        const objective = await Objective.findById(id);
                        resolve(objective);
                    }
                }
            );
        });
    }

    static resetObjectiveById(id) {
        console.log("UPDATING RESETTING OBJECTIVE:", id);
        return new Promise((resolve, reject) => {

            db.run(
                'UPDATE objectives SET realFinishDateTime = ? WHERE id = ?',
                [null, id],
                async function (err) {
                    if (err) {
                        console.error('Error updating resetting objective:', err);
                        reject(err);
                    } else {
                        console.log(`Resetting objective updated: ${this.changes}`);
                        const objective = await Objective.findById(id);
                        resolve(objective);
                    }
                }
            );
        });
    }

    static deleteById(id) {
        console.log("DELETING OBJECTIVE:", id);
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM objectives WHERE id = ?',
                [id],
                function (err) {
                    if (err) {
                        console.error('Error deleting objective:', err);
                        reject(err);
                    } else {
                        console.log(`Objective deleted: ${this.changes}`);
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = Objective;
