const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const actionRoutes = require('./routes/actionRoutes');
const userRoutes = require('./routes/userRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');
const User = require('./models/User');

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