const User = require('../model/Users');
const JWT = require('jsonwebtoken');

const getPort = ('/portfolio', (req, res) => {
    const jwtHeaderKey = process.env.HEADER_KEY;
    const jwtSecretKey = process.env.SECRET_KEY;
    try {
        const token = req.header(jwtHeaderKey);
        const tokenVerified = JWT.verify(token, jwtSecretKey);
        if (tokenVerified) {
            res.cookie(tokenVerified).json('User Valid!');
                        
        }
        else {
            res.redirect('/')
            res.status(400).send('Access strictly forbidden')
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

})
module.exports = getPort;