const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const authCon = require('../../controllers/auth.controller');
router.post('/signin', authCon.handleSignIn);
router.post('/signup', authCon.handleSignUp);
module.exports = router;
