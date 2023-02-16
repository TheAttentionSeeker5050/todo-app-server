// mongoose imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

// todo schema
const TodoSchema = new Schema({
    user: {
        type: String,
        unique: true
    },
    todos: [String]
});

const todo = mongoose.model("todos", TodoSchema);

module.exports = todo;