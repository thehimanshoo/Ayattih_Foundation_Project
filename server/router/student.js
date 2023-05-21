const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
// const User = require('../models/usersModel');
const Student = require('../models/student');

/*
   User Register
   Usage : Register a Student
   URL : http://127.0.0.1:5000/api/students/register
   type : STUDENT
   access : private
   method : POST
*/
router.post('/register', [
    body('first_name').notEmpty().withMessage("First Name is required..."),
    body('last_name').notEmpty().withMessage("Last Name is required..."),
    body('Class').notEmpty().withMessage("Class is required..."),
    body('section').notEmpty().withMessage("Section is required..."),
    body('userType').notEmpty().withMessage("User Type is required..."),
    body('userID').notEmpty().withMessage("UserID is required..."),
    body('password').notEmpty().withMessage("Password is required..."),
], async (request, response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({msg : errors.array()});
    }

    try{
        let {first_name, last_name, Class, section, userType, userID, password} = request.body;

        // Checking if student Exist or not
        let student = await Student.findOne({userID : userID});
        if(student){
            return response.status(401).json({msg : "User Already Exists..."})
        }

        // save to database
        student = new Student({first_name, last_name, Class, section, userType, userID, password});
        student = await student.save();

        response.send({msg : "Result saved Successfully...",
        student : student});
        
     }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{msg : error.message}]});
    }
});


/*
   User Router
   Usage : Get all Students
   URL : http://127.0.0.1:5000/api/students/list
   type : STUDENT
   access : private
   method : Get
*/
router.get('/list', async (request, response) => {
    try{
        // Filtering for the Students
        let students = await Student.find({type : 'STUDENT'});
        if(!students){
            return response.status(200).json({msg : "Student list is Empty..."});
        }

        response.status(200).json(students);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({error : [{error : err.message}]});
    }
});

module.exports = router;