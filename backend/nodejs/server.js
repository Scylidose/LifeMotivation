const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/dbconfig');
const User = require('./models/User');
const Action = require('./models/Action');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../../frontend/public', 'index.html');
  res.sendFile(indexPath);
});

app.get('/api/actions/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const actions = await Action.findAllByAuthor(author);
    res.json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    res.status(500).json({ error: 'Error fetching actions' });
  }
});

app.post('/api/actions/:id/comments', async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  try {
    await Action.saveActionComment(id, comment);
    const action = await Action.findById(id);
    res.json(action);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
});

app.delete('/api/actions/:id', async (req, res) => {
  const actionId = req.params.id;
  try {
    await Action.deleteById(actionId);
    res.json({ message: 'Action deleted successfully' });
  } catch (error) {
    console.error('Error deleting action:', error);
    res.status(500).json({ error: 'Error deleting action' });
  }
});

app.post('/api/actions', async (req, res) => {

  const { title, description, author, isGood, importance, frequency, difficulty, intendedDuration } = req.body;
  try {

    const newAction = await Action.create(
      title,
      description,
      author,
      isGood,
      importance,
      frequency,
      difficulty,
      intendedDuration
    );

    res.status(201).json({ message: 'Action created successfully', action: newAction });
  } catch (error) {
    console.error('Error creating action:', error);
    res.status(500).json({ error: 'Failed to create action' });
  }
});

app.get('/api/users/:username/actions', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOrCreate(username);
    const actions = await user.getActions();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  console.log('Closing database connection...');

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }

    // Terminate the application
    process.exit();
  });
});