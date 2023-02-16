const express = require('express')
const router = express.Router();
// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { body, validationResult } = require('express-validator');




// create the user using POST "/api/auth/createuser" does not require auth no login required
// used to send data to the DB
router.post('/createuser',[   
    body('name', ' Enter a valid name').isLength({min:3}),

    body('email', ' Enter a valid Email').isEmail(),

    // password must be at least 5 chars long
    body('password',' Password must be min 5').isLength({ min: 5 })

],async(req,res)=>{
    // if there are errors return bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // check whether the user with this email exists already
    try{

    
    let user = await User.findOne({email:req.body.email})
    console.log(user)
    if(user){
        return res.status(400).json({error:'sorry a user with this email already exists'})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

    //   .then(user => res.json(user))
    //       .catch(err=>{console.log(err)})
    //   res.json({error:'please enter a unique value for email', messege:err.messege
        res.json({user})
    }catch(error){
        console.log(error.messege);
        res.status(500).send("some error occured")
    }


    })







// sending data from body to DB 
    // const user = User(req.body)
    // user.save()


    // console.log(req.body)
    // res.send('Hello')

module.exports = router ;