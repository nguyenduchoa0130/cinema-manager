const router = require('express').Router();
const pageController = require('../controllers/page.controller');
const authMid = require('../middlewares/auth.middleware');
router.get('/signin', authMid.isSignedIn, pageController.renderSignIn);
router.get('/signup', authMid.isSignedIn, pageController.renderSignUp);
router.get('/', pageController.renderIndexPage);

module.exports = router;
