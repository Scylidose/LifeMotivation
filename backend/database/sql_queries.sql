INSERT INTO users (username, password_hash, salt, email, xp) VALUES
('john_doe', '$2y$10$NP4Uh8X2RmjhQIe9lGE3WeK3hnmDRYUtNQhsaf7Gkru4vMkn9ThFq', '$2y$10$', 'john.doe@example.com', 100),
('jane_smith', '$2y$10$vvuV.D/Nxc73riV9U10nUOp4xo5kHoTcFdHETHQblLSKy94i/xnc6', '$2y$10$', 'jane.smith@example.com', 75),
('user3', '$2y$10$uDwlfgsXldbQDnQkn0I3V.o04fHbTWsYRf/TMR2MWi0Dn9G/269U6', '$2y$10$', 'user3@example.com', 50);

INSERT INTO objectives (title, description, priority, complexity, publishedDateTime, intendedFinishDateTime, realFinishDateTime, author) VALUES
('Learn SQL', 'Master the basics of SQL', 2, 3, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'john_doe'),
('Complete Project X', 'Finish the project on time', 1, 5, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'jane_smith'),
('Exercise Regularly', 'Stay fit and healthy', 3, 2, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'user3');

INSERT INTO actions (title, description, importance, daysOfWeek, frequency, difficulty, intendedDuration, realDuration, comment, author, consistencyStreak, isGood, publishedDateTime, finishedDateTime, objectiveId) VALUES
('Read SQL Documentation', 'Study the official SQL documentation', 4, '{"sunday":false,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"saturday":false}', 3, 2, 60, 45, 'Good progress!', 'john_doe', 5, 1, strftime('%s','now'), strftime('%s','now'), 1),
('Meeting with Team', 'Discuss project progress with the team', 5, '{"sunday":false,"monday":false,"tuesday":true,"wednesday":false,"thursday":false,"friday":false,"saturday":false}', 1, 4, 90, 75, 'Productive meeting', 'jane_smith', 3, 1, strftime('%s','now'), strftime('%s','now'), 2),
('Run 5 Miles', 'Go for a long run', 3, '{"sunday":true,"monday":false,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"saturday":true}', 2, 3, 45, 45, 'Feeling great!', 'user3', 10, 1, strftime('%s','now'), strftime('%s','now'), 3);
