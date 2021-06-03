const authMid = require('../../middlewares/auth.middleware');
const clusterCon = require('../../controllers/cluster.controller');
const router = require('express').Router();
router.post('/add', clusterCon.insert);
router.route('/:id').put(clusterCon.update).delete(clusterCon.delete);
router.get('/', clusterCon.fetchById, clusterCon.fetchByClusterName, clusterCon.fetchBySystemId, clusterCon.fetchAll);
module.exports = router;
