const User = require('../model/Users');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const login_post = ('/login', async (req, res, next) => {
    const {email, password} = req.body;    
    // const hashedPassword = await bcrypt.hash(password, salt);
    const userDetail = await User.findOne({ email }); console.log(userDetail)
   try{
    if (!email && password !== userDetail.password ) {
       res.status(404).json({ message: "user not found" });
    }
    else {

        if (await bcrypt.compare(password, userDetail.password))
            res.status(200).json(userDetail)
            
    next()
    }  
}catch(error){
   res.status(403).json( error.message);

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
module.exports = { login_post, login_get };