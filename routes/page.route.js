const router = require('express').Router();
const pageController = require('../controllers/page.controller');
router.get('/', pageController.renderIndexPage);

module.exports = router;
