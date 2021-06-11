'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            this.belongsTo(models.Showtimes, {
                foreignKey: 'showtimesId',
            });
            this.hasMany(models.Ticket, {
                foreignKey: 'bookingId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Booking.init(
        {
            userId: DataTypes.INTEGER,
            showtimesId: DataTypes.INTEGER,
            timeBooking: DataTypes.DATE,
            sumMoney: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Booking',
        }
    );
    return Booking;
};
