const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<h1>Listening to boilerplate express api</h1><p>Made with Express.js, JWT authentication, Mongodb, and Passport.</p>")
})

app.listen(port, () => {
    console.log(`Bolierplate app listening on port ${port}`)
})