const router = require('express').Router();
const userRoutes = require('./api/user.routes');
const authRoutes = require('./api/auth.routes');
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
module.exports = router;
