'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Showtimes, {
                foreignKey: 'showtimesId',
            });
            this.belongsTo(models.Cinema, {
                foreignKey: 'cinemaId',
            });
            this.hasOne(models.Ticket, {
                foreignKey: 'seatId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Seat.init(
        {
            symbol: DataTypes.STRING,
            row: DataTypes.INTEGER,
            col: DataTypes.INTEGER,
			isOrder: DataTypes.BOOLEAN, 
			priceTicket: DataTypes.BIGINT,
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
