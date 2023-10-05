const User = require('../model/Users');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 
const {createToken, authenticate} = require('./auth');
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
            await user.save();
            return res.status(200).json(user);

        } catch (error) {
            res.status(400).json({ Message: 'Something went wrong!' })
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
        await User.findByIdAndUpdate(req.params._id);
        res.status(200).json({ Updated: `user with ${req.params._id}` });
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
})
const deletePost = ('/:_id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json({ Deleted: `User with ${req.params._id}` });
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});

const login_post = ('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email: email });
    try {
        if (!userDetail) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            if (await bcrypt.compare(password, userDetail.password)) {
                const accessToken = createToken(userDetail);
                 res.header(process.env.HEADER_KEY, accessToken,{maxAge: 60*60*24*30*1000, httpOnly: true}).json({
                    email: userDetail.email,
                    password: userDetail.password,
                    token: accessToken
                });
            } else {
                res.status(404).json('Missmatched credential(password must match!)')

            }


            next()
        }
    } catch (error) {
        res.status(403).json({ Message: 'something went wrong!' });

    }
});
const login_get = ('/login', async (req, res) => {
    try {
        const allLoginUsers = await User.find();
        res.status(200).json(allLoginUsers);
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});
const login_put = ('/login/:_id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params._id);
        res.status(200).json({ Updated: `user with ${req.params._id}` });
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});

const login_delete = ('/login/:_id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json({ Deleted: `user with ${req.params._id}` });
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});
const getPort = ('/portfolio', (req, res) => {
    
    res.send('This is portfolio page navigation!')
    });



module.exports = { setPost, getPost, deletePost, putPost, login_post, login_get, login_delete, login_put, getPort };

