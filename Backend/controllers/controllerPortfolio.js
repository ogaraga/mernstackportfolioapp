const User = require('../model/Users');
const JWT = require('jsonwebtoken');
const userLoggedIn = require('./controllerLogin')

const getPort = ('/portfolio', userLoggedIn, (req, res, next) => {
    const jwtHeaderKey = process.env.HEADER_KEY;
    const jwtSecretKey = process.env.SECRET_KEY;    
    const token = req.headers(jwtHeaderKey);
    if(!token)
    return res.sendStatus(404);
        try {
        const tokenVerified = JWT.verify(token, jwtSecretKey);
         res.cookie(tokenVerified).json('Access Granted!');
            User.tokenVerified = tokenVerified;
            User.password = password;                           
               
    } catch (error) {
            res.status(400).send({ message: 'A glitch happened!' });
    }
next()
})
module.exports = getPort;