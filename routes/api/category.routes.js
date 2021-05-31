const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const cateCon = require('../../controllers/category.controller');

router.route('/:id').get(cateCon.fetchByIdOrName).put(cateCon.update).delete(cateCon.delete);
router.post('/add', cateCon.add);
router.get('/', cateCon.fetchAll);
module.exports = router;
