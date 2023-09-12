const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Connect to the SQLite database
const { closeDatabase } = require('./config/dbconfig');

const actionRoutes = require('./routes/actionRoutes');
const userRoutes = require('./routes/userRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.use('/api/actions', actionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/objectives', objectiveRoutes);

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../../frontend/public', 'index.html');
  res.sendFile(indexPath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  console.log('Closing database connection...');
  closeDatabase();
  process.exit();
});