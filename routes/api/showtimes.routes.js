const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const showtimesMid = require('../../middlewares/showtimes.middleware');
const showtimesCon = require('../../controllers/showtimes.controller');
router
    .route('/:id')
    .put(showtimesMid.isShowtimesIdValid, showtimesMid.isValidTimeStart, showtimesCon.update)
    .delete(showtimesMid.isShowtimesIdValid, showtimesCon.delete);
router.post('/add', showtimesMid.isFilmIdValid, showtimesMid.isValidTimeStart, showtimesCon.insert);
router.get(
    '/',
    showtimesCon.fetchByCinemaHasShowtimesByFilmIdAndClusterId,
    showtimesCon.fetchByCluterId,
    showtimesCon.fetchShowtimesById
);
module.exports = router;
