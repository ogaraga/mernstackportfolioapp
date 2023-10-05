const JWT = require('jsonwebtoken');
require('dotenv').config();
const User =require('../model/Users')


     //generate jwt token for user
const createToken = (user)=>{
     let jwtSecret = process.env.SECRET_KEY;
     let userPayload ={
        email: user.email,
        id: user._id
     };
    const accessToken = JWT.sign(userPayload, jwtSecret, {expiresIn: '60000'});
    return accessToken;
 }  
 // authenticate user
 const authenticate = async (req, res,next)=>{
     const jwtSecretKey = process.env.SECRET_KEY;   
     const token = await req.header("Authorization");
     if (!token)
      return res.status(404).send('Jwt token must be provided!'); 
    try {
        const tokenVerified = await JWT.verify(token, jwtSecretKey); 
        if(tokenVerified){       
        req.verified = tokenVerified;
         return next()
      }
    } catch (error) {
        res.status(500).json('Internal issue occurred!')
    }
}
module.exports = {authenticate, createToken};
    
       