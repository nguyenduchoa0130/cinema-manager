const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const statusCon = require('../../controllers/status.controller');
router.post('/add', statusCon.insert);
router.route('/:id').put(statusCon.update).delete(statusCon.delete);
router.get('/', statusCon.fetchById, statusCon.fetchByName, statusCon.fetchAll);
module.exports = router;
