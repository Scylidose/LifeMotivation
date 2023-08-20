const db = require('../config/dbconfig');

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

    static findAllByAuthor(author) {
        console.log("FETCHING OBJECTIVE FOR ", author);
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM objectives WHERE author = ?', [author], (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    const objective = rows.map(row => new Objective(
                        row.id,
                        row.title,
                        row.description,
                        row.author,
                        row.priority,
                        row.complexity,
                        row.intendedFinishDateTime,
                        row.publishedDateTime
                    ));
                    resolve(objective);
                }
            });
        });
    }
}

module.exports = Objective;
