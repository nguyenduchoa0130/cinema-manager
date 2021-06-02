const authMid = require('../../middlewares/auth.middleware');
const systemCon = require('../../controllers/system.controller');
const uploads = require('../../config/multer');
const router = require('express').Router();
router.post('/add', uploads.single('logo'), systemCon.insert);
router.route('/:id').get(systemCon.fetchById).put(systemCon.update).delete(systemCon.delete);
router.get('/', systemCon.fetchAll);

module.exports = router;
