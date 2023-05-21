const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Practice = require('../models/practice');

/*
   User's Practice Router
   Usage : Practice data of User
   URL : http://127.0.0.1:5000/api/student/practice/register
   params : name, Class , score, prTodayCorrect, prTodayAttempted, prTopicLevel, prTopicLevelUpScore, hwTotal, hwDone
   access : private
   method : post
*/
router.post('/register', [
    body('name').notEmpty().withMessage("Name is required..."),
    body('Class').notEmpty().withMessage("Class is required..."),
    body('score').notEmpty().withMessage("Score is required..."),
    body('prTodayCorrect').notEmpty().withMessage("Practice Correct Today, is required..."),
    body('prTodayAttempted').notEmpty().withMessage("Practice Attempt Today, is required..."),
    body('prTopicLevel').notEmpty().withMessage("Practice Topic Level is required..."),
    body('prTopicLevelUpScore').notEmpty().withMessage("Practice Topic Level UP Score is required..."),
    body('hwTotal').notEmpty().withMessage("HW Total is required..."),
    body('hwDone').notEmpty().withMessage("HW Done is required..."),
], async (request, response) => {

    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : [{msg : errors.array()}]});
    }

    try{
        let {name, Class, score, prTodayCorrect, prTodayAttempted, prTopicLevel, prTopicLevelUpScore, hwTotal, hwDone} = request.body;

        // save to database
        let practiceData = new Practice({name, Class, score, prTodayCorrect, prTodayAttempted, prTopicLevel, prTopicLevelUpScore, hwTotal, hwDone});
        practiceData = await practiceData.save();

        response.send({msg : "Practice data recorded Successfully...",
        practiceData : practiceData});
        
     }
    catch (error) {
        console.error(error);
        response.status(500).json({error : [{msg : error.message}]});
    }
});


/*
   Practice Router
   Usage : Get practice record
   URL : http://127.0.0.1:5000/api/student/practice/view
   type : practice
   access : private
   method : Get
*/
router.get('/view', async (request, response) => {
    try{
        // Filtering for Practice record
        let practice = await Practice.find({type : "prTodayCorrect"});
        if(!practice){
            return response.status(200).json({msg : "Practice list Empty..."});
        }

        response.status(200).json(practice);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({error : [{error : err.message}]});
    }
})

module.exports = router;