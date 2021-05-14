const router = require('express').Router();
const userCon = require('../../controllers/user.controller');
const authMid = require('../../middlewares/auth.middleware');
router
    .route('/:id?')
    .get(userCon.fetchByIdOrEmail)
    .put(authMid.authenticate, authMid.isOwnerOrAdmin, userCon.isIdValid, userCon.update)
    .delete(authMid.authenticate, authMid.isAdmin, userCon.isIdValid, userCon.delete);
router.get('/', userCon.fetchAll);
module.exports = router;
