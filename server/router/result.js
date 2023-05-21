const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Result = require('../models/result');

/*
   User's Result Router
   Usage : Post user result
   URL : http://127.0.0.1:5000/api/student/result/register
   params : name , level , result
   access : private
   method : post
*/
router.post('/register',[
    body('name').notEmpty().withMessage("Name is Required"),
    body('userID').notEmpty().withMessage("userID is Required"),
    body('level').notEmpty().withMessage("Level is Required"),
    body('result').notEmpty().withMessage("Result is Required"),

], async (request, response) => {
    let errors = validationResult(request.body);
    if(!errors.isEmpty()){
        return response.status(401).json({msg : errors.array()});
    }
    try{
        let {userID, name, level, result} = request.body;
        
        // // Checking if userID Exist or not
         let verifiedUser = await Result.findOne({userID : userID});
        if(verifiedUser){
            return response.status(401).json({msg : "Result data of User already Exists..."});
        };

        // save to database
        verifiedUser = new Result({userID, name, level, result});
        verifiedUser = await verifiedUser.save();

        response.send({msg : "Result saved Successfully...",
        verifiedUser : verifiedUser});
        
     }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{msg : error.message}]});
    }
});


/*
   Result Router
   Usage : Get all Results
   URL : http://127.0.0.1:5000/api/student/result/view
   access : private
   method : Get
*/
router.get('/view', async (request, response) => {
    try{
        // Filtering for Results
        let result = await Result.find({type : "result"});
        if(!result){
            return response.status(200).json({msg : "Result list Empty..."});
        }

        response.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({error : [{error : err.message}]});
    }
})

module.exports = router;