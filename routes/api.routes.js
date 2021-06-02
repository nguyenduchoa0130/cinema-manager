const router = require('express').Router();
const userRoutes = require('./api/user.routes');
const authRoutes = require('./api/auth.routes');
const categoryRoutes = require('./api/category.routes');
const clusterRoutes = require('./api/cluster.routes');
const systemRoutes = require('./api/system.routes');
const filmRoutes = require('./api/film.routes');
const statusRoutes = require('./api/status.routes');
const cinemaRoutes = require('./api/cinema.routes');

router.use('/cinema', cinemaRoutes);
router.use('/status', statusRoutes);
router.use('/cluster', clusterRoutes);
router.use('/system', systemRoutes);
router.use('/film', filmRoutes);
router.use('/cate', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
module.exports = router;
