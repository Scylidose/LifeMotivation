const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/dbconfig');
const User = require('./models/User');
const Action = require('./models/Action');
const Objective = require('./models/Objective');

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

app.post('/api/actions/:id/finish', async (req, res) => {
  const id = req.params.id;
  const { realDuration } = req.body;

  try {
    await Action.finishActionById(id, realDuration);
    const action = await Action.findById(id);
    res.json(action);
  } catch (error) {
    console.error('Error finishing action:', error);
    res.status(500).json({ error: 'Error finishing action' });
  }
});

app.post('/api/actions/:id/reset', async (req, res) => {
  const id = req.params.id;

  try {
    await Action.resetActionById(id);
    const action = await Action.findById(id);
    res.json(action);
  } catch (error) {
    console.error('Error resetting action:', error);
    res.status(500).json({ error: 'Error resetting action' });
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

  const { title, description, author, isGood, importance, daysOfWeek, difficulty, intendedDuration, linkedObjective } = req.body;
  try {

    const newAction = await Action.create(
      title,
      description,
      author,
      isGood,
      importance,
      daysOfWeek,
      difficulty,
      intendedDuration,
      linkedObjective
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

app.get('/api/objectives/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const objectives = await Objective.findAllByAuthor(author);
    res.json(objectives);
  } catch (error) {
    console.error('Error fetching objectives:', error);
    res.status(500).json({ error: 'Error fetching objectives' });
  }
});

app.get('/api/objective/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const objective = await Objective.findById(id);
    res.json(objective);
  } catch (error) {
    console.error('Error fetching objective:', error);
    res.status(500).json({ error: 'Error fetching objective' });
  }
});

app.get('/api/objectives/:id/actions', async (req, res) => {
  const id = req.params.id;
  try {
    const actions = await Action.findActionsByObjective(id);
    res.json(actions);
  } catch (error) {
    console.error('Error fetching objective actions:', error);
    res.status(500).json({ error: 'Error fetching objective actions' });
  }
});

app.post('/api/objectives', async (req, res) => {
  const { title, description, author, priority, complexity, intendedFinishDateTime } = req.body;
  try {
    const newObjective = await Objective.create(
      title,
      description,
      author,
      priority,
      complexity,
      intendedFinishDateTime
    );

    res.status(201).json({ message: 'Objective created successfully', objective: newObjective });
  } catch (error) {
    console.error('Error creating objective:', error);
    res.status(500).json({ error: 'Failed to create objective' });
  }
});

app.delete('/api/objectives/:id', async (req, res) => {
  const objectiveId = req.params.id;
  try {
    await Objective.deleteById(objectiveId);
    res.json({ message: 'Objective deleted successfully' });
  } catch (error) {
    console.error('Error deleting objective:', error);
    res.status(500).json({ error: 'Error deleting objective' });
  }
});

app.post('/api/objectives/:id/finish', async (req, res) => {
  const id = req.params.id;

  try {
    await Objective.finishObjectiveById(id);
    const objective = await Objective.findById(id);
    res.json(objective);
  } catch (error) {
    console.error('Error finishing objective:', error);
    res.status(500).json({ error: 'Error finishing objective' });
  }
});

app.post('/api/objectives/:id/reset', async (req, res) => {
  const id = req.params.id;

  try {
    await Objective.resetObjectiveById(id);
    const objective = await Objective.findById(id);
    res.json(objective);
  } catch (error) {
    console.error('Error resetting objective:', error);
    res.status(500).json({ error: 'Error resetting objective' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  User.findOrCreate("root");
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