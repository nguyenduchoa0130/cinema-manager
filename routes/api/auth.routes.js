const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const authCon = require('../../controllers/auth.controller');
const passport = require('passport');
const passportConfig = require('../../config/passport');
passportConfig(passport);
router.get('/otp/:userId', authCon.sendOTP);
router.post('/signin', authMid.isNotSignedIn, authCon.handleSignIn);
router.post(
    '/signup',
    authMid.isNotSignedIn,
    authMid.isValidEmail,
    authCon.handleSignUp
);
router.post('/active', authCon.activeAccount);
router.delete('/signout', authMid.isSignedIn,  authCon.handleSignOut);
module.exports = router;
