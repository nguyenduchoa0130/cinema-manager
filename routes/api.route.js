const db = require('../models/index');
const Users = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);
const router = require('express').Router();

router.get('/user/:id?', async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ message: 'Bad request: missing id of user' });
    }
    try {
        let user = await Users.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            res.status(404).json({
                errorCode: 0,
                message: 'Not found',
            });
        } else {
            res.status(200).json({
                user,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
