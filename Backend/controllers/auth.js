// imported user in the app 
const User = require('../models/User')
// express validator for the valid data sending 
const { validationResult } = require('express-validator');
// bcrypt used for hashing salt and pepper
const bcrypt = require('bcryptjs');
const argon2 = require('argon2')
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

        // create a new user 
        let user = await User.findOne({ email: req.body.email })


        if (user) {
            return res.status(400).json({ error: 'sorry a user with this email already exists' })
        }

        // password encryption 
        const secPass = await argon2.hash(req.body.password)

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

        if (!authtoken) {
            return res.status(500).json({error:"Server Error"})
        }
        res.json({ authtoken, success:true })

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
           return res.status(400).json({error:"No Account Found with this Email, Please Signup First"})
       }
       const passwordCompare = await argon2.verify(user.password, password)
       console.log("===========",passwordCompare)
       if (!passwordCompare) {
           return res.status(400).json({error:"Please try to login with correct credentials"})
       }
       console.log(user)

       const data = {
           user: {
               id: user.id
           }
       }
       const authtoken = jwt.sign(data, JWT_SECRET)
       console.log(authtoken)
       if (!authtoken) {
        return res.status(500).json({error:"Server Error"})
    }

       res.json({ authtoken, success:true })

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