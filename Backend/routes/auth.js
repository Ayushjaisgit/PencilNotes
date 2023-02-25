const express = require('express')
const router = express.Router();
// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { body, validationResult } = require('express-validator');
// bcrypt used for hashing salt and pepper
const bcrypt = require('bcryptjs');
// jwt 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'
//middleware fetchuser import
const fetchuser = require('../middleware/FetchUser')


// Route 1 
// create the user using POST "/api/auth/createuser" does not require auth no login required
// used to send data to the DB

router.post('/createuser', [
    body('name', ' Enter a valid name').isLength({ min: 3 }),

    body('email', ' Enter a valid Email').isEmail(),

    // password must be at least 5 chars long
    body('password', ' Password must be min 5').isLength({ min: 5 })

], async (req, res) => {

    // if there are errors return bad error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {

        // create a new user 1
        let user = await User.findOne({ email: req.body.email })

        console.log(user)

        if (user) {
            return res.status(400).json({ error: 'sorry a user with this email already exists' })
        }

        // password encryption 
        // using bcryptjs and bcryptjs returns the promise and that's why we'll use await 
        const salt = await bcrypt.genSalt(10) // generating random salt of ten values
        const secPass = await bcrypt.hash(req.body.password, salt) // bcrypt.hash is used to initialize the bcrypt

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken })

    } catch (error) {
        console.log(error.messege);
        res.status(500).send("Internal server error on creating a new user")
    }
})


// Route 2
// till here it was all about creating a user 
// Authenticate a user using post "api/auth/login" no login required

router.post('/login', [

    body('email', ' Enter a valid Email').isEmail(),
    body('password', 'Passwords cannot be blank').exists(),

], async (req, res) => {
     // if there are errors return bad error
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     const {email, password}= req.body;
     try{
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken })

     }catch(error){
        console.log(error.messege);
        res.status(500).send("Internal server error on Login")
     }

})

// Route 3
// gives the logged in user details "api/auth/getuser" login required

router.post('/getuser',fetchuser, async (req, res) => {
    try{
        userId= req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
        
    }
    catch(error){
        console.log(error.messege);
        res.status(500).send("Internal server error In get User")
    }
    
    
});








module.exports = router;