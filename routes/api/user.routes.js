const router = require('express').Router();
const userCon = require('../../controllers/user.controller');
const authMid = require('../../middlewares/auth.middleware');
router.use(authMid.authenticate);
router.post('/add', authMid.isAdmin, userCon.add);
router
    .route('/:id')
    .get(authMid.isActive, authMid.isOwnerOrAdmin, userCon.fetchById)
    .put(authMid.isActive, authMid.isOwnerOrAdmin, userCon.update)
    .delete(authMid.isAdmin, userCon.delete);
router.get('/', authMid.isAdmin, userCon.fetchByKey, userCon.fetchAll);
module.exports = router;
