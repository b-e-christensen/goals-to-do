const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
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
})

const Todo = model('Todo', todoSchema);

module.exports = Todo;