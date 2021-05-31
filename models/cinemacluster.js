'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaCluster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CinemaCluster.init({
    clusterName: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CinemaCluster',
  });
  return CinemaCluster;
};