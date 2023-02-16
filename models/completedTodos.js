// mongoose imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

// completed todo schema
const CompletedTodoSchema = new Schema({
    user: {
        type: String,
        unique: true
    },
    completedTodos: [String]
});

const completedTodo = mongoose.model("completedTodos", CompletedTodoSchema);

module.exports = completedTodo;