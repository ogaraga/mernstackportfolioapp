const User = require('../model/Users');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

//register routes
const setPost = ('/', async (req, res, next) => {
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
            user.token = token;
            user.password = undefined;
            await user.save();
            return res.status(200).json({user, Token: token, }); 

        } catch (error) {
            res.status(400).json(error.message)
        }
    };


    next();
});
const getPost = ('/', async (req, res) => {
    try {
        const allRegisteredUsers = await User.find();
        res.status(200).json(allRegisteredUsers);
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
})
module.exports = {setPost, getPost};

