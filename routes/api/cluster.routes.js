const authMid = require('../../middlewares/auth.middleware');
const bookingMid = require('../../middlewares/booking.middleware');
const clusterCon = require('../../controllers/cluster.controller');
const clusterMid = require('../../middlewares/cluster.middleware');
const router = require('express').Router();
router.post('/add', clusterCon.insert);
router
    .route('/:id')
    .put(clusterMid.isCinemaIdValid, clusterMid.isSystemIdValid, clusterCon.update)
    .delete(clusterMid.isCinemaIdValid, bookingMid.checkBookingByClusterId, clusterCon.delete);
router.get('/', clusterCon.fetchById, clusterCon.fetchByClusterName, clusterCon.fetchBySystemId, clusterCon.fetchAll);
module.exports = router;
