const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const statisticCon = require('../../controllers/statistic.controller');

router.get('/', statisticCon.byFilmId, statisticCon.byClusterId);

module.exports = router;
