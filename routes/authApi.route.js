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

    // get form elements
    let formContents = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    }


    res.json({"echoResponse": formContents})
})

module.exports = router;