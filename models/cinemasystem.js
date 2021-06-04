'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CinemaSystem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.CinemaCluster, {
                foreignKey: 'systemId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    CinemaSystem.init(
        {
            systemName: DataTypes.STRING,
            logoSrc: DataTypes.STRING,
            logo: DataTypes.BLOB,
        },
        {
            sequelize,
            modelName: 'CinemaSystem',
        }
    );
    return CinemaSystem;
};
