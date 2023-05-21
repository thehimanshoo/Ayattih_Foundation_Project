const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Teacher = require('../models/teacher');


/*
   User Register
   Usage : Register a Teacher
   URL : http://127.0.0.1:5000/api/teachers/register
   type : TEACHER
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

        // Checking if teacher Exist or not
        let teacher = await Teacher.findOne({userID : userID});
        if(teacher){
            return response.status(401).json({msg : "User Already Exists..."})
        }

        // save to database
        teacher = new Teacher({first_name, last_name, Class, section, userType, userID, password});
        teacher = await teacher.save();

        response.send({msg : "Result saved Successfully...",
                   teacher : teacher});
        
     }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{msg : error.message}]});
    }
});


/*
   User Router
   Usage : Get all Teachers
   URL : http://127.0.0.1:5000/api/teachers/list
   type : TEACHER
   access : private
   method : Get
*/
router.get('/list', async (request, response) => {
    try{
        // Filtering for the Teachers
        let teachers = await Teacher.find({type : 'TEACHER'});
        if(!teachers){
            return response.status(200).json({msg : "Teacher list is Empty..."});
        }

        response.status(200).json(teachers);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({error : [{error : err.message}]});
    }
});

module.exports = router;