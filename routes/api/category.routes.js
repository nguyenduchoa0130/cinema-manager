const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const cateMid = require('../../middlewares/category.middleware');
const cateCon = require('../../controllers/category.controller');
router.route('/:id').put(cateMid.isCategoryIdValid, cateCon.update).delete(cateMid.isCategoryIdValid, cateCon.delete);
router.post('/add', cateCon.add);
router.get('/', cateCon.fetchById, cateCon.fetchByName, cateCon.fetchAll);
module.exports = router;
