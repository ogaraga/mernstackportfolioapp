const User = require('../model/Users');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const login_post = ('/login', async (req, res, next) => {
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
const login_get =('/login', async (req, res) => {
    try {
        const allLoginUsers = await User.find();
        res.status(200).json(allLoginUsers);
    } catch (error) {
        res.status(400).json({ Message: 'Something went wrong!' })
    }
});
module.exports = {login_post, login_get};