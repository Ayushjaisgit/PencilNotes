const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'

const fetchuser= (req, res, next)=>{
    // geting the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please Authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user= data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"please Authenticate using valid token"})
    }
   
}


module.exports = fetchuser;