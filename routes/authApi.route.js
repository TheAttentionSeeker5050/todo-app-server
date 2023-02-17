// express imports
const express = require("express");
const router = express.Router();

// encrypt libs import
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import db schemas
const User = require("../models/user.model");

// auth token and middlewares imports
const jwt = require('jsonwebtoken');
const { generateAccessToken, authenticateToken } = require("../middlewares/authenticate.middleware");



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
    const findUser = User.findOne({
        email: formData.email
    }, (error, data) => {
        // console.log("data:", data);
        if (!data) {
            // user does not exists, return http failure response with not found in db message
            return res.status(500).json({message: "Error: User not found", data: formData});
        } else {
            // user exists, so we continue

            // we compare the encrypted password with the form input using an algo from bcrypt
            bcrypt.compare(formData.password, data.password, (error, result) => {
                if (result===true) {
                    
                    // get token
                    // const token = generateAccessToken({email: req.body.email})
                    const token = generateAccessToken(formData.email);

                    // if the passwords match, return success json response and webtoken
                    return res.status(200).json({
                        message: "Success: Logged in!",
                        token: `Bearer ${token}`
                    });

                } else {
                    // if the passwords don't match, return failure json response
                    return res.status(403).json({message: "Failure: Could not log in"});

                }
            })
        }
    });

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
        return res.status(400).json({message: "Error: Passwords don't match"});
    }

    

    const findUser = User.findOne({
        email: formData.email
    }) 

    // check if the user already exists
    await findUser.then((data) => {
        if (data) {
            return res.status(400).json({message: "Failure: Could not create user, user already exists"});
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

            // return response
            return res.status(201).json({message: "Success: User added to db"});
        }
    });
});

/* GET user profile. */
router.get('/profile', authenticateToken, function(req, res, next) {
    
    res.send(req.user);
});


module.exports = router;