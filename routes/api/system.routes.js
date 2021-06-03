const authMid = require('../../middlewares/auth.middleware');
const systemCon = require('../../controllers/system.controller');
const uploads = require('../../config/multer');
const router = require('express').Router();
router.post('/add', uploads.single('logo'), systemCon.insert);
router.route('/:id').put(uploads.single('logo'), systemCon.update).delete(systemCon.delete);
router.get('/',systemCon.fetchById, systemCon.fetchByName, systemCon.fetchAll);

module.exports = router;
