//importing packages
const router = require('express').Router();
const {setPost,getPost} = require('../controllers/controllerRegister');
const { login_get, login_post } = require('../controllers/controllerLogin');
const getPort = require('../controllers/controllerPortfolio');

//register routes
router.post('/', setPost);
router.get('/', getPost);

//login routes
router.post('/login', login_post);
router.get('/login', login_get);  


//portfolio route 
router.get('/portfolio', getPort);

module.exports = router;
