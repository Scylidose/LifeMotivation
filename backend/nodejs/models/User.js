const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    courriel: {
        type: String,
        required: true
    },
    actions: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Action'
        }
    ],
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', UserSchema, 'users');