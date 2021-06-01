'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cinema extends Model {
        static associate(models) {
            this.hasOne(models.CinemaCluster, {
                foreignKey: 'clusterId',
            });
            this.hasMany(models.Seat, {
                foreignKey: 'cinemaId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Cinema.init(
        {
            cinemaName: DataTypes.STRING,
            address: DataTypes.STRING,
			row: DataTypes.INTEGER,
			col: DataTypes.INTEGER,
            clusterId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Cinema',
        }
    );
    return Cinema;
};
