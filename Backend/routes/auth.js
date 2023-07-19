const express = require('express')
const router = express.Router();
// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { body } = require('express-validator');
const fetchuser = require('../middleware/FetchUser')

const authController  = require('../controllers/auth')




// Route 1 
// create the user using POST "/api/auth/createuser" does not require auth no login required
// used to send data to the DB

router.post('/createuser', [
    body('name', ' Enter a valid name').isLength({ min: 3 }),

    body('email', ' Enter a valid Email').isEmail(),

    // password must be at least 5 chars long
    body('password', ' Password must be min 5').isLength({ min: 5 })

], authController.createUser)



// Route 2
// till here it was all about creating a user 
// Authenticate a user using post "api/auth/login" no login required

router.post('/login', [

    body('email', ' Enter a valid Email').isEmail(),
    body('password', 'Passwords cannot be blank').exists(),

],authController.userLogin)

// Route 3
// gives the logged in user details "api/auth/getuser" login required

router.post('/getuser',fetchuser  );








module.exports = router;