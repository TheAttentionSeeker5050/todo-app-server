const mongoose = require("mongoose");

// import url from dotenv
const uri = process.env.MONGO_URL;
console.log(uri)
// connect to db
mongoose.connect(uri).then(
    () => {
        console.log("Connecting to remote DB");
    },
    err => {
        console.error(err);
    }
)

module.exports = mongoose;