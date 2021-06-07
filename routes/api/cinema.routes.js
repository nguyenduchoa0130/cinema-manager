const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const cineMid = require('../../middlewares/cinema.middleware');
const cineCon = require('../../controllers/cinema.controller');
router.post('/add', cineCon.insert);
router.route('/:id').put(cineMid.isCinemaIdValid, cineMid.isClusterIdValid, cineCon.update).delete(cineMid.isCinemaIdValid, cineCon.delete);
router.get('/', cineCon.fetchById, cineCon.fetchByCinemaName, cineCon.fetchByClusterId, cineCon.fetchAll);
module.exports = router;
