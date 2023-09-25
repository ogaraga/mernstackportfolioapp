//importing packages
const router = require('express').Router();
const {setPost, getPost, putPost, deletePost} = require('../controllers/controllerRegister');
const { login_get, login_post, login_delete, login_put } = require('../controllers/controllerLogin');
const getPort = require('../controllers/controllerPortfolio');

//register routes
router.get('/', getPost).post('/', setPost);
router.put('/:_id', putPost).delete('/:_id', deletePost);

//login routes
router.get('/login', login_get).post('/login', login_post);
router.put('/login', login_put).delete('/:_id', login_delete);  


//portfolio route 
router.get('/portfolio', getPort);

module.exports = router;
