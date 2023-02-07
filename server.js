// instantiate express server
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// import routes
const authRoutes = require("./routes/authApi.route");
const apiRoutes = require("./routes/api.route")



// dotenv
require('dotenv').config();

// import db config
const mongoose = require("./config/db.config");
mongoose.set("strictQuery", false);

// for processing json responses
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send("<h1>Listening to boilerplate express api</h1><p>Made with Express.js, JWT authentication, Mongodb, and Passport.</p>");
})

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1", apiRoutes);

app.listen(port, () => {
    console.log(`Bolierplate app listening on port ${port}`);
})