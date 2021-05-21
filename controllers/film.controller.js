const { Op } = require('sequelize');
const { Film: FilmModel } = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const errorType = require('../config/errorType');

class Film {
    async fetchAll(req, res, next) {
        try {
            let films = await FilmModel.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            if (!films.length) {
                res.json(helper.success('Không tìm thầy bộ phim nào', null));
            } else {
                res.json(helper.success('Thao tác thành công', films));
            }
        } catch (err) {
            next();
        }
    }
    async fetchById(req, res, next) {
		try {
		
		} catch (err) {
			
		}
	}
    async fetchByName(res, res, next) {}
    add(req, res, next) {
		try {
			
		} catch (err) {
			
		}
	}
    update(req, res, next) {}
    delete(req, res, next) {}
}
