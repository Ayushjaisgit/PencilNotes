// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { validationResult } = require('express-validator');
// bcrypt used for hashing salt and pepper
const bcrypt = require('bcryptjs');
// jwt 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'


const createUser = async (req, res) => {

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
}

    
const userLogin = async (req, res) => {
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

}


const getUser = async (req, res) => {
    try{
        userId= req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
        
    }
    catch(error){
        console.log(error.messege);
        res.status(500).send("Internal server error In get User")
    }
    
    
}
exports.createUser = createUser
exports.userLogin = userLogin
exports.getUser = getUser