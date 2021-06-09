const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const bookingCon = require('../../controllers/booking.controller');

router.post('/add', bookingCon.insert);
router.get('/', bookingCon.fetchByUserId);
module.exports = router;
