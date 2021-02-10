const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
    validate() {},
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

taskSchema.pre('save', async function(next) {
  const task = this;
  // if (task.isModified()) {
  //   task.password = await bcrypt.hash(task.password, 8);
  // }
  console.log('task modified');
  next();
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
