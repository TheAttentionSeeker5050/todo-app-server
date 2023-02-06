// mongoose imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
})

// add a name to schema
const user = mongoose.model("users", UserSchema)

module.exports = user;