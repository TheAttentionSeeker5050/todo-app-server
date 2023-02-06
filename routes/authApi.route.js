const express = require("express");
const router = express.Router();


// auth routes
router.get("/login", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Login page"})
})



router.get("/register", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Register page"})
})

router.post("/register", (req, res) => {
    // let formContents = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: req.body.password,
    // }

    let formContents = req.body
    console.log(formContents)

    res.json(formContents)
})

module.exports = router;