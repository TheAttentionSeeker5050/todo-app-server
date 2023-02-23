// express imports
const express = require("express");
const router = express.Router();

// import authentication
const { authenticateToken } = require("../middlewares/authenticate.middleware");

// import model
const Todo = require("../models/todo.model");
const CompletedTodo = require("../models/completedTodos");


// your routes here

// ----------------------------- Todos routes

router.post("/todos", authenticateToken, async (req, res) => {
    // this works both as add todos for first time or renewing the todos list

    try {
        // request data
        const reqData = {
            user: req.user, // email
            todos: JSON.parse(req.body.todos) // we have to parse the todos, otherwise it is a string
        };
        
        // we first find if there is a todo entry with the same user email on the database
        const todoEntries = Todo.findOne({user: reqData.user});
        
        await todoEntries.then( async todos => {
            if (!todos) {
                // if user doesn't has entry, add to db, return http success and message
                Todo.create(reqData);
                return res.status(201).json({message: "Success: Created todos entry list"});
            } else {
                // if user already has entries, replace them
                await Todo.findOneAndReplace({user: reqData.user} , {user: reqData.user, todos: reqData.todos});
                return res.status(200).json({message: "Success: Replaced current todos entry list"});
            }
        });
        
    } catch (error) {
        return res.status(400).json({message: "Invalid request error"});
    }
});

router.get("/todos", authenticateToken, async (req, res) => {
    // get the todos for user
    try {
        // find todos in database
        const todoEntries = Todo.findOne({user: req.user});
        
        await todoEntries.then(todos => {
            if (!todos) {
            // if there are not todos, return empty todos array
            return res.status(200).json({todos: []});
        } else {
            // if there are todos, return todos array
            return res.status(200).json({todos: todos.todos});
        }
    });
    
    } catch (error) {
        return res.status(400).json({message: "Invalid request error"});
    }
});



// -------------------------------- Completed Todos routes

router.post("/completed-todos", authenticateToken, async (req, res) => {
    // add a new todo for new user
    try {
        // request data
        const reqData = {
            user: req.user, // email
            completedTodos: JSON.parse(req.body.completedTodos) // we have to parse the todos, otherwise it is a string
        };
        
        // we first find if there is a todo entry with the same user email on the database
        const completedTodoEntries = CompletedTodo.findOne({user: reqData.user})
        
        await completedTodoEntries.then( async completedTodos => {
        if (!completedTodos) {
            // if user doesn't has entry, add to db, return http success and message
            CompletedTodo.create(reqData)
            return res.status(201).json({message: "Success: Created completed todos entry list"});
        } else {
            // if user already has entries, replace them
            await CompletedTodo.findOneAndReplace({user: reqData.user} , {user: reqData.user, completedTodos: reqData.completedTodos});
            return res.status(200).json({message: "Success: Replaced current completed todos entry list"});
        }
        });

    } catch (error) {
        return res.status(400).json({message: "Invalid request error"});
    }

});

router.get("/completed-todos", authenticateToken, async (req, res) => {
    // get the todos for user
    try {
        // find todos in database
        const completedTodoEntries = CompletedTodo.findOne({user: req.user});
        
        await completedTodoEntries.then(completedTodos => {
            
            if (!completedTodos) {
                // if there are not todos, return empty todos array
                return res.status(200).json({compeletedTodos: []});
            } else {
            // if there are todos, return todos array
            return res.status(200).json({completedTodos: completedTodos.completedTodos});
        }
        });

    } catch (error) {
        return res.status(400).json({message: "Invalid request error"});
    }
});




module.exports = router;