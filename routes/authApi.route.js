// express imports
const express = require("express");
const router = express.Router();

// encrypt libs import
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import db schemas
const User = require("../models/user.model");

// auth routes
router.get("/login", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({message: "Login page"});
})

router.post("/login", (req, res) => {
    // login post request >> result is an api key
    const formData = {
        email: req.body.email,
        password: req.body.password,
    }

    // we request the user data on the db


    // we compare the encrypted password with the form input using an algo from bcrypt

    // do the password match?

    // if yes, return success and web token over json response

    // if not, return failure json response message

    return res.status(200).json({message: "Login page"});
})

router.get("/register", (req, res) => {
    // res.send("<h1>Login page</h1>");
    res.json({"message": "Register page"});
})

router.post("/register", async (req, res) => {

    // get form elements
    let formData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        
    };

    // compare passwords
    if (req.body.password!==req.body.confirmPassword) {
        return res.status(400).json({message: "Error. Passwords don't match"});
    }

    

    const findUser = User.findOne({
        email: formData.email
    }) 

    // check if the user already exists
    await findUser.then((data) => {
        if (data) {
            return res.status(400).json({message: "Could not create user, user already exists"});
        } else {

            // encrypt password
            bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
                User.create({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: hash
                });
            });
            return res.status(201).json({message: "User added to db"});
        }
    });
});

module.exports = router;