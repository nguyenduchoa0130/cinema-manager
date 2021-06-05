'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtimes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Showtimes.init({
    cinemaId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Showtimes',
  });
  return Showtimes;
};