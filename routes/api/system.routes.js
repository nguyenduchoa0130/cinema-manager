const authMid = require('../../middlewares/auth.middleware');
const bookingMid = require('../../middlewares/booking.middleware');
const systemCon = require('../../controllers/system.controller');
const showtimesMid = require('../../middlewares/showtimes.middleware');
const uploads = require('../../config/multer');
const router = require('express').Router();
router.post('/add', uploads.single('logo'), systemCon.insert);
router.route('/:id').put(uploads.single('logo'), systemCon.update).delete(bookingMid.checkBookingBySystemId, systemCon.delete);
router.get('/', systemCon.fetchById, systemCon.fetchByName, systemCon.fetchAll);

module.exports = router;
