const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Admin = require('../models/admin');

/*
   User Register
   Usage : Register an Admin
   URL : http://127.0.0.1:5000/api/admin/register
   type : ADMIN
   access : private
   method : POST
*/
router.post('/register', [
    body('organisationName').notEmpty().withMessage("Organisation Name is required..."),
    body('userType').notEmpty().withMessage("User type is required..."),
    body('userID').notEmpty().withMessage("UserID is required..."),
    body('password').notEmpty().withMessage("Password is required..."),

], async (request, response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({msg : errors.array()});
    };

    try{
        let {organisationName, userType, userID, password} = request.body;

        // Checking if teacher Exist or not
        // console.log(userID,  "Comming from Admin body");
        let admin = await Admin.findOne({userID : userID});
        if(admin){
            return response.status(401).json({msg : "User Already Exists..."})
        }

        // save to database
        admin = new Admin({organisationName, userType, userID, password});
        admin = await admin.save();

        response.send({msg : "Result saved Successfully...",
        admin : admin});
        
     }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{msg : error.message}]});
    }
});


/*
   User Router
   Usage : Get all Admins
   URL : http://127.0.0.1:5000/api/admin/list
   type : ADMIN
   access : private
   method : Getz
*/
router.get('/list', async (request, response) => {
    try{
        // Filtering for Admin
        let admin = await Admin.find({type : 'ADMIN'});
        if(!admin){
            return response.status(200).json({msg : "Admin list is Empty..."});
        }

        response.status(200).json(admin);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({error : [{error : err.message}]});
    }
})

module.exports = router;