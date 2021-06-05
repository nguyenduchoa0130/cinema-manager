'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Cinema, {
                foreignKey: 'cinemaId',
            });
            this.belongsTo(models.Showtimes, {
                foreignKey: 'showtimesId',
            });
        }
    }
    Seat.init(
        {
            symbol: DataTypes.STRING,
            row: DataTypes.INTEGER,
            col: DataTypes.INTEGER,
            cinemaId: DataTypes.INTEGER,
            showtimesId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Seat',
        }
    );
    return Seat;
};
