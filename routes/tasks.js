const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task: String,
    description: String,
    date: String,
    image: String,
});

module.exports = mongoose.model('task', taskSchema);