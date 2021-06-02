const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const cineCon = require('../../controllers/cinema.controller');
router.get('/add', cineCon.insert);
router.route('/:id').put(cineCon.update).delete(cineCon.delete);
router.get('/', cineCon.fetchById, cineCon.fetchByCinemaName, cineCon.fetchAll);
module.exports = router;
