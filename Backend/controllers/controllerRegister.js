const User = require('../model/Users');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

//register routes
const setPost = ('/', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(401).send('User already exists!');
        return res.redirect('/');
    }
    else {

        try {
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = new User({
                username,
                email,
                password: hashedPassword
            })
            //generate jwt token for user
            let jwtSecret = process.env.SECRET_KEY;
            let userPayload = {
                password: user.password,
                email: user.email,
                id: user._id
            }
            const token = JWT.sign(userPayload, jwtSecret);
            await user.save();
            return res.status(200).json({ user, Token: token, });

        } catch (error) {
            res.status(400).json({Message: 'Something went wrong!'})
        }
    }


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
const putPost = ('/:_id', async (req, res) => {
    try {
        const allRegisteredUsers = await User.findByIdAndUpdate(req.params._id);
        res.status(200).json({Updated: `user with ${req.params._id}`});
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
})
const deletePost = ('/:_id', async (req, res) => {
    try {
        const allRegisteredUsers = await User.findByIdAndDelete(req.params._id);
        res.status(200).json({Deleted: `User with ${req.params._id}`});
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
})

module.exports = { setPost, getPost, deletePost, putPost};

