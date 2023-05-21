const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require("../models/superAdmin");

/*
   User Router
   Usage : Register a User
   URL : http://127.0.0.1:5000/api/superAdmin/register
   params : name , email , password
   access : private
   method : post
*/
router.post('/register', [
  body('name').notEmpty().withMessage("Name is Required"),
  body('userID').notEmpty().withMessage("userID is Required"),
  body('password').notEmpty().withMessage("Password is Required"),
  body('userType').notEmpty().withMessage("Admin-Type is Required"),

] ,async (request, response) => {

  let errors = validationResult(request);
  if(!errors.isEmpty()){
      return response.status(401).json({errors : [{msg : errors.array()}]})
  };

  try{
      let {name, userID, password, userType} = request.body;
     

      // Checking if user Exist or not
      let user = await User.findOne({userID : userID});
      if(user){
          return response.status(401).json({msg : "User Already Exists..."})
      }

      // save to database
      user = new User({name , userID , password , userType});
      user = await user.save();

      response.send({msg : "Registration is Successful...",
                 user : user});
                   }
  catch (error) {
      console.error(error);
      response.status(500).json({error : [{msg : error.message}]});
  }
});

/*
   User Router
   Usage : Get all Super Admins
   URL : http://127.0.0.1:5000/api/superAdmin/list
   type : superAdmin
   access : private
   method : Get
*/
router.get("/list", async (request, response) => {
  try {
    // Filtering for the super-Admin
    let superAdmin = await User.find({ type: "SUPER-ADMIN" });
    if (!superAdmin) {
      return response.status(200).json({ msg: "Super Admin list is Empty..." });
    }

    response.status(200).json(superAdmin);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: [{ error: err.message }] });
  }
});

module.exports = router;
