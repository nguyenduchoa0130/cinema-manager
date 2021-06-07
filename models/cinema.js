'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cinema extends Model {
        static associate(models) {
            this.belongsTo(models.CinemaCluster, {
                foreignKey: 'clusterId',
            });
            this.hasMany(models.Seat, {
                foreignKey: 'cinemaId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Cinema.init(
        {
            cinemaName: DataTypes.STRING,
            row: DataTypes.INTEGER,
            col: DataTypes.INTEGER,
            clusterId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Cinema',
        }
    );
    return Cinema;
};
