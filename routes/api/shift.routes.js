const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const shiftCon = require('../../controllers/shift.controller');
router.route('/:id').put(shiftCon.update).delete(shiftCon.delete);
router.post('/add', shiftCon.insert);
// router.get('/', cateCon.fetchById, cateCon.fetchByName, cateCon.fetchAll);
module.exports = router;
