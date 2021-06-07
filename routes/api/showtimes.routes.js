const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const showtimesMid = require('../../middlewares/showtimes.middleware');
const showtimesCon = require('../../controllers/showtimes.controller');
router.route('/:id').put(showtimesCon.update).delete(showtimesCon.delete);
router.post('/add', showtimesCon.insert);
// router.get('/', shiftCon.fetchByCinemaId);
module.exports = router;
