//importing packages
const router = require('express').Router();
const { authenticate } = require('../controllers/auth');
const {setPost, getPost, putPost, deletePost} = require('../controllers/controllerAll');
const { login_get, login_post, login_delete, login_put, getPort} = require('../controllers/controllerAll');

//register routes
router.get('/', getPost).post('/', setPost);
router.put('/:_id', putPost).delete('/:_id', deletePost);

//login routes
router.get('/login', login_get).post('/login', login_post);
router.put('/login/:_id', login_put).delete('/login/:_id', login_delete);  


//portfolio route 
router.get('/portfolio',authenticate, getPort);

module.exports = router;
