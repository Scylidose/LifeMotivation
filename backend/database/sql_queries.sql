INSERT INTO users (username, password_hash, salt, email, xp) VALUES
('john_doe', '$2y$10$NP4Uh8X2RmjhQIe9lGE3WeK3hnmDRYUtNQhsaf7Gkru4vMkn9ThFq', '$2y$10$', 'john.doe@example.com', 100),
('jane_smith', '$2y$10$vvuV.D/Nxc73riV9U10nUOp4xo5kHoTcFdHETHQblLSKy94i/xnc6', '$2y$10$', 'jane.smith@example.com', 75),
('user3', '$2b$10$.KZ8PGhgdGvrEnTU905W/ufRNNGDU/ckf4mFcC/zZPa1UtTUuh7tS', '$2b$10$.KZ8PGhgdGvrEnTU905W/u', 'user3@example.com', 50);

INSERT INTO objectives (title, description, priority, complexity, publishedDateTime, intendedFinishDateTime, realFinishDateTime, author) VALUES
('Learn SQL', 'Master the basics of SQL', 2, 3, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'john_doe'),
('Complete Project X', 'Finish the project on time', 1, 5, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'jane_smith'),
('Exercise Regularly', 'Stay fit and healthy', 3, 2, strftime('%s','now'), strftime('%s','now'), strftime('%s','now'), 'user3'),
('Learn Python', 'Become proficient in Python programming', 3, 4, strftime('%s','now') * 1000, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 'john_doe'),
('Write Research Paper', 'Complete a research paper on AI', 2, 5, strftime('%s','now') * 1000, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 'jane_smith'),
('Meditate Daily', 'Practice meditation for mental clarity', 4, 2, strftime('%s','now') * 1000, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 'user3');

INSERT INTO actions (title, description, importance, daysOfWeek, frequency, difficulty, intendedDuration, realDuration, comment, author, consistencyStreak, isGood, publishedDateTime, finishedDateTime, objectiveId) VALUES
('Read SQL Documentation', 'Study the official SQL documentation', 4, '{"sunday":false,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"saturday":false}', 3, 2, 60, 45, 'Good progress!', 'john_doe', 5, 1, strftime('%s','now'), strftime('%s','now'), 1),
('Meeting with Team', 'Discuss project progress with the team', 5, '{"sunday":false,"monday":false,"tuesday":true,"wednesday":false,"thursday":false,"friday":false,"saturday":false}', 1, 4, 90, 75, 'Productive meeting', 'jane_smith', 3, 1, strftime('%s','now'), strftime('%s','now'), 2),
('Run 5 Miles', 'Go for a long run', 3, '{"sunday":true,"monday":false,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"saturday":true}', 2, 3, 45, 45, 'Feeling great!', 'user3', 10, 1, strftime('%s','now'), strftime('%s','now'), 3),
('Write Python Code', 'Work on Python projects for skill improvement', 4, '{"sunday":true,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"saturday":false}', 2, 3, 90, 75, 'Making good progress', 'john_doe', 6, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 4),
('Conduct AI Experiments', 'Perform experiments for research paper', 5, '{"sunday":false,"monday":false,"tuesday":true,"wednesday":true,"thursday":false,"friday":false,"saturday":false}', 3, 4, 120, 110, 'Getting valuable results', 'jane_smith', 4, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 5),
('Morning Meditation', 'Start the day with a 15-minute meditation', 3, '{"sunday":true,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true}', 1, 1, 15, 15, 'Feeling relaxed', 'user3', 15, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, 6),
('Write Blog Post', 'Create a blog post on a topic of interest', 2, '{"sunday":false,"monday":true,"tuesday":false,"wednesday":false,"thursday":true,"friday":false,"saturday":false}', 2, 2, 60, 45, 'Engaging content', 'user3', 8, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, ''),
('Study Machine Learning', 'Deepen knowledge in machine learning', 4, '{"sunday":true,"monday":false,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"saturday":true}', 3, 2, 90, 75, 'Understanding concepts', 'user3', 6, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, ''),
('Practice Guitar', 'Learn and practice new guitar chords', 3, '{"sunday":false,"monday":false,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"saturday":false}', 2, 1, 45, 30, 'Improving skills', 'user3', 12, 1, strftime('%s','now') * 1000, strftime('%s','now') * 1000, '');