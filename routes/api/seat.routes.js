const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const seatCon = require('../../controllers/seat.controller');
router.put('/order/:id', seatCon.order);
router.put('/cancel/:id', seatCon.cancel);
module.exports = router;
