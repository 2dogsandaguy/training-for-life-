const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;
