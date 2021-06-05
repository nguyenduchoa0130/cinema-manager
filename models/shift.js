'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shift extends Model {
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
    Shift.init(
        {
            shiftName: DataTypes.STRING,
            timeStart: DataTypes.DATE,
            timeEnd: DataTypes.DATE,
            timeStart: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Shift',
        }
    );
    return Shift;
};
