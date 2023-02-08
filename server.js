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

// set up cors
const cors = require('cors');
const whiteList = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
]

// use cors functions
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(whiteList.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
}))


// for processing json responses
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// this is a main api view, it is not important, it just shows that the server is running
app.get("/", (req, res) => {
    res.send("<h1>Listening to boilerplate express api</h1><p>Made with Express.js, JWT authentication, Mongodb, and Passport.</p>");
})

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1", apiRoutes);

app.listen(port, () => {
    console.log(`Bolierplate app listening on port ${port}`);
})