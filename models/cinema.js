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
                onDelete: 'SET NULL',
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
            hooks: {
                afterCreate(cinema, options) {
                    let row = cinema.row;
                    let col = cinema.col;
                },
            },
        }
    );
    return Cinema;
};
