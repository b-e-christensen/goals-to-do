const { Schema, model } = require('mongoose');


const taskSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false,
      },
      priority: {
        type: String
      },
      creator: { 
        type: String, 
        // required: true,
      },
      assignees: [{
        type: String,
      }]
})

const Task = model('Task', taskSchema);

module.exports = Task;