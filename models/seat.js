'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Cinema, {
                foreignKey: 'cinemaId',
            });
        }
    }
    Seat.init(
        {
            col: DataTypes.INTEGER,
            row: DataTypes.INTEGER,
            isOrder: DataTypes.BOOLEAN,
            cinemaId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Seat',
        }
    );
    return Seat;
};
