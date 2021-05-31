const helper = require('../config/helper');
const sequelize = require('sequelize');
class Database {
    async fetchAll(model) {
        try {
            let rows = await model.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if (rows.length === 0) {
                return null;
            } else {
                return rows;
            }
        } catch (err) {
            throw err;
        }
    }
    async fetchByPk(model, id) {
        try {
            let rows = await model.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if (rows) {
                return rows;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

	
}
module.exports = new Database();
