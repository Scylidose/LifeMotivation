const express = require('express');
const cors = require('cors');
const db = require('./config/dbconfig');
const User = require('./models/User');
const Action = require('./models/Action');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
