const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    completeByDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String
    },
    steps: [
        {
            stepId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
            },
            stepName: {
                type: String,
                required: true
            },
        },
    ],
})

const Goal = model('Goal', goalSchema);

module.exports = Goal