const router = require('express').Router();
const imgCon = require('../controllers/img.controller');
router.get('/poster/:id', imgCon.poster);
router.get('/thumb/:id', imgCon.thumbnail);
router.get('/logo/:id', imgCon.logo);
module.exports = router;
