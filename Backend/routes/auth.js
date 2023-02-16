const express = require('express')
const router = express.Router();
// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { body, validationResult } = require('express-validator');


// create the user using POST "/api/auth" does not require auth 


// used to send data to the DB
router.post('/',[
    
    body('name', ' Enter a valid name').isLength({min:3}),
    body('email', ' Enter a valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password',' Password must be min 5').isLength({ min: 5 })
],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user)).catch(err=>{})

















// sending data from body to DB 
    // const user = User(req.body)
    // user.save()


    // console.log(req.body)
    // res.send('Hello')



} )

module.exports = router ;