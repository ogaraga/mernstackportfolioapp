//importing packages
const router = require('express').Router();
const User = require('../model/Users');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

//register routes
router.post('/', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).send('User already exists!');
    }
    else {

        try {
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = new User({
                username,
                email,
                password: hashedPassword
            });
            //generate jwt token for user
            let jwtSecret = process.env.SECRET_KEY;
            let userPayload = {
                password: user.password,
                email: user.email,
                id: user._id
            }
            const token = JWT.sign(userPayload, jwtSecret);
            await user.save();
            return res.status(200).cookie({Token: token }).json(user);

        } catch (error) {
            res.status(400).json(error.message)
        }
    };


    next();
});
router.get('/', async (req, res) => {
    try {
        const allRegisteredUsers = await User.find();
        res.status(200).json(allRegisteredUsers);
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
})


//login routes
router.post('/login', async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(password, salt);
    const userDetail = await User.findOne({ email });
     if (!userDetail) {
        return res.status(404).json({ message: "user not found" });
    }
    else {

        if (!await bcrypt.compare(password, userDetail.password))
            return res.status(403).json({ message: 'wrong password' });
    }
    {
        res.status(200).json({
            email,
            password: hashedPassword, 
        });
    }
    
    
    next()
});
router.get('/login', async (req, res) => {
    try {
        const allLoginUsers = await User.find();
        res.status(200).json(allLoginUsers);
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});

//portfolio route and jwt token validation
router.get('/portfolio', (req, res) => {
    const jwtHeaderKey = process.env.HEADER_KEY;
    const jwtSecretKey = process.env.SECRET_KEY;
    try {
        const token = req.header(jwtHeaderKey);
        const tokenVerified = JWT.verify(token, jwtSecretKey);
        if (tokenVerified) {
            res.cookie(tokenVerified).json('User Valid!')
            res.status(200).send('User access granted!');
        }
        else {
            res.redirect('/')
            res.status(400).send('Access strictly forbidden')
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

})


module.exports = router;
