const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const superAdmin = require("../models/superAdmin");
const Admin = require("../models/admin");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const jwt = require("jsonwebtoken");
// const authenticate = require("../middlewares/authenticate");

/*
   User Router
   Usage : Login a User
   URL : http://127.0.0.1:5000/api/users/login
   params : email , password
   access : private
   method : post
*/

router.post(
  "/login",
  [
    body("userID").notEmpty().withMessage("userID is required..."),
    body("password").notEmpty().withMessage("Password is required..."),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: [{ msg: errors.array() }] });
    }

    try {
      let { userID, password } = request.body;
      console.log("Coming from request.body : ", userID, password);

      let payloadData;
      // Checking user, exist or not
      let isMatch = await superAdmin.findOne({ userID: userID });
      let isMatch2 = await Admin.findOne({ userID: userID });
      let isMatch3 = await Teacher.findOne({ userID: userID });
      let isMatch4 = await Student.findOne({ userID: userID });

      if (!isMatch && !isMatch2 && !isMatch3 && !isMatch4) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Checking password for login
      let isPasswordMatch = password === isMatch?.password;
      let isPasswordMatch2 = password === isMatch2?.password;
      let isPasswordMatch3 = password === isMatch3?.password;
      let isPasswordMatch4 = password === isMatch4?.password;

      switch (true) {
        case isPasswordMatch:
          payloadData = isMatch;
          break;
        case isPasswordMatch2:
          payloadData = isMatch2;z

          break;
        case isPasswordMatch3:
          payloadData = isMatch3;

          break;
        case isPasswordMatch4:
          payloadData = isMatch4;

          break;
      }

      if (
        !isPasswordMatch &&
        !isPasswordMatch2 &&
        !isPasswordMatch3 &&
        !isPasswordMatch4
      ) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Filtering payload according to isMatch
      const data = {
        ...payloadData._doc,
      };

      delete data.password;
      delete data.created;

      let payload = {
        data,
      };

      // Creating JWT token
      jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) throw err;
        response.status(200).json({
          msg: "Login Success",
          token: token,
        });
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: [{ msg: error.message }] });
    }
  }
);

// router.post('/login', [
//     body('userID').notEmpty().withMessage("userID is required..."),
//     body('password').notEmpty().withMessage("Password is required..."),
// ] ,async (request, response) => {
//     let errors = validationResult(request);
//     if(!errors.isEmpty()){
//         return response.status(401).json({errors : [{msg : errors.array()}]});
//     }

//     try{
//         let {userID, password} = request.body;
//         // console.log("comming from login page", userID);
//         // console.log("comming from login page", password);

//         // Checking user, exist or not
//         let isMatch = await Users.findOne({UID : userID});
//         if(!isMatch){
//         console.log("Checking isMatch",isMatch);

//             // return response.status(401).json({errors : [{msg : "Invalid Credentials"}]})
//         }

//         // Checking password for login
//         let isPasswordMatch = await password === isMatch.password;
//         if(!isPasswordMatch){
//             return response.status(401).json({errors : [{msg : "Invalid Credentials"}]});
//         }

//         // Creating JWT token
//         let payload = {
//             user : {
//                 id : isMatch.id,
//                 name : isMatch.name,
//                 userID : isMatch.userID,
//                 type : isMatch.type
//             }
//         }

//         jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
//             if (err) throw err;
//             response.status(200).json({
//                 msg : "Login Success",
//                 token : token
//             });
//         });
//     }
//     catch (error) {
//         console.error(error);
//         response.status(500).json({error : [{msg : error.message}]});
//     }
// });

module.exports = router;
