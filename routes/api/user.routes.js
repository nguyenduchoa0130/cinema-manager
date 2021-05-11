const router = require('express').Router();
const userCon = require('../../controllers/user.controller');
router
    .route('/:id')
    .get(userCon.isIdValid, userCon.fetchById)
    .put(userCon.isIdValid, userCon.update)
    .delete(userCon.isIdValid, userCon.delete);
router.get('/', userCon.fetchAll);
module.exports = router;
