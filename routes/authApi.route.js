const express = require("express");
const router = express.Router();

// import db schemas
const User = require("../models/user.model");

// auth routes
router.get("/login", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Login page"});
})

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/register", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Register page"});
})

router.post("/register", async (req, res) => {

    // get form elements
    let formContents = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        
    };

    // compare passwords
    if (req.body.password!==req.body.confirmPassword) {
        return res.status(400).json({message: "Error. Passwords don't match"});
    }

    

    const findUser = User.findOne({
        email: formContents.email
    }) 

    // check if the user already exists
    await findUser.then((data) => {
        if (data) {
            return res.status(400).json({message: "Could not create user, user already exists"});
        } else {

            // encrypt password
            bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
                User.create({
                    email: formContents.email,
                    firstName: formContents.firstName,
                    lastName: formContents.lastName,
                    password: hash
                });
            });
            return res.status(201).json({message: "User added to db"});
        }
    });

});

module.exports = router;