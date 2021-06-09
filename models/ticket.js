'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Booking, {
                foreignKey: 'bookingId',
            });
            this.belongsTo(models.Seat, {
                foreignKey: 'seatId',
            });
        }
    }
    Ticket.init(
        {
            bookingId: DataTypes.INTEGER,
            seatId: DataTypes.INTEGER,
            priceTicket: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Ticket',
        }
    );
    return Ticket;
};
