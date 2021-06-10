const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');

class StatisticController {
	async byClusterId(req, res, next){
		
	}
	async byFilmId(req, res, next){

	}
}
module.exports = StatisticController;
