const express = require("express");
const router = express.Router();

// import db schemas
const User = require("../models/user.model");

// auth routes
router.get("/login", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Login page"});
})



router.get("/register", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Register page"});
})

router.post("/register", (req, res) => {

    // get form elements
    let formContents = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    // compare passwords
    if (formContents.password!==formContents.confirmPassword) {
        return res.status(400).json({message: "Error. Passwords don't match"});
    }

    // encrypt password
    

    const findUser = User.findOne({
        email: formContents.email
    }) 

    // check if the user already exists
    findUser.then((data) => {
        if (data) {
            return res.status(400).json({message: "Could not create user, user already exists"});
        } else {
            User.create({
                email: formContents.email,
                firstName: formContents.firstName,
                lastName: formContents.lastName,
                password: formContents.password,
            });
            return res.status(201).json({message: "User added to db"});
        }
    });

});

module.exports = router;