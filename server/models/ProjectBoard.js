const { Schema, model } = require('mongoose');

const Task = require('./Task')

const projectBoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  collaborators: [{ 
    name: String,
    email: String,
    lastViewed: String
  }],
  groupChat: {
    type: Array,
    default: []
  },
  tasks: { type: Array, ref: Task },
})

const ProjectBoard = model('ProjectBoard', projectBoardSchema);

module.exports = ProjectBoard