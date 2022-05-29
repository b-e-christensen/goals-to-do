const { Schema, model } = require('mongoose');
const Step = require('./Step');

const goalSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    completeByDate: {
        type: Date,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        required: false,
    },
    steps: { type: Array, ref: Step}
})

const Goal = model('Goal', goalSchema);

module.exports = Goal