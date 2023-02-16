// mongoose imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String,
});

// add a name to schema
const user = mongoose.model("users", UserSchema);

module.exports = user;