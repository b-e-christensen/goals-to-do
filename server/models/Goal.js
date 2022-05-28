const { Schema, model } = require('mongoose');

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
    steps: [
        {
            stepName: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                default: false
            }
        },
    ],
})

const Goal = model('Goal', goalSchema);

module.exports = Goal