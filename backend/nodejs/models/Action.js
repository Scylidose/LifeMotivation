const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  title: String,              // Title of the habit
  description: String,        // Description of the habit
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',              // Reference to the User model
    required: true
  },
  isGood: Boolean,           // Whether it's a bit (true) or unbit (false)
  importance: Number,        // Importance (0-5)
  frequency: Number,         // Frequency (0-5)
  difficulty: Number,        // Difficulty (0-5)
  consistencyStreak: Number, // Consistency streak
  intendedDuration: Number,  // Intended duration in minutes
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;