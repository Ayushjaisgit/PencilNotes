const express = require('express')
const router = express.Router();
// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { body, validationResult } = require('express-validator');
// bcrypt used for hashing salt and pepper
const bcrypt = require('bcryptjs');




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

    // create a new user 1
    let user = await User.findOne({email:req.body.email})

    console.log(user)

    if(user){
        return res.status(400).json({error:'sorry a user with this email already exists'})
    }


    // using bcryptjs 
    const salt = await bcrypt.genSalt(10) // generating random salt of ten values
    const secPass = await bcrypt.hash( req.body.password, salt)

    user = await User.create({
        name: req.body.name,
        email:req.body.email ,
        password:secPass ,
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