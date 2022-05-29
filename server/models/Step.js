const { Schema, model } = require('mongoose');

const stepSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
})

const Step = model('Step', stepSchema)

module.exports = Step