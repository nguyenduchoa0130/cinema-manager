'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Showtimes extends Model {
        static associate(models) {
            this.hasMany(models.Seat, {
                foreignKey: 'showTimesId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Showtimes.init(
        {
            cinemaId: DataTypes.INTEGER,
            filmId: DataTypes.INTEGER,
            shiftId: DataTypes.INTEGER,
            priceTicket: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Showtimes',
        }
    );
    return Showtimes;
};
