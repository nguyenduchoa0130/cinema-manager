const router = require('express').Router();
const userRoutes = require('./api/user.routes');
const authRoutes = require('./api/auth.routes');
const categoryRoutes = require('./api/category.routes');
const clusterRoutes = require('./api/cluster.routes');
const systemRoutes = require('./api/system.routes');
const filmRoutes = require('./api/film.routes');
const statusRoutes = require('./api/status.routes');
const cinemaRoutes = require('./api/cinema.routes');
const seatRoutes = require('./api/seat.routes');
const showtimesRoutes = require('./api/showtimes.routes');
const bookingRoutes = require('./api/booking.routes');
const statisticRoutes = require('./api/statistic.routes');

router.use('/statistic', statisticRoutes);
router.use('/booking', bookingRoutes);
router.use('/showtimes', showtimesRoutes);
router.use('/seat', seatRoutes);
router.use('/cinema', cinemaRoutes);
router.use('/status', statusRoutes);
router.use('/cluster', clusterRoutes);
router.use('/system', systemRoutes);
router.use('/film', filmRoutes);
router.use('/cate', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
module.exports = router;
