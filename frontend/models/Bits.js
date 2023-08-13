const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BitsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

mongoose.model('Bits', BitsSchema, 'bits');