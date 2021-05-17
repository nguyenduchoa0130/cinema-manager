const router = require('express').Router();
const userCon = require('../../controllers/user.controller');
const authMid = require('../../middlewares/auth.middleware');
router.use(authMid.authenticate);
router
    .route('/:id')
    .get(authMid.isActive, authMid.isOwnerOrAdmin, userCon.fetchByIdOrEmail)
    .put(
        authMid.isActive,
        authMid.isOwnerOrAdmin,
        userCon.isIdValid,
        userCon.update
    )
    .delete(authMid.isAdmin, userCon.isIdValid, userCon.delete);
router.get('/', authMid.isAdmin, userCon.fetchAll);
module.exports = router;
