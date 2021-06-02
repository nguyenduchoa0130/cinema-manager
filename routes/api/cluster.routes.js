const authMid = require('../../middlewares/auth.middleware');
const clusterCon = require('../../controllers/cluster.controller');
const router = require('express').Router();
router.post('/add', clusterCon.add);
router.route('/:id').get(clusterCon.fetchById).put(clusterCon.update).delete(clusterCon.delete);
router.get('/', clusterCon.fetchAll);
module.exports = router;
