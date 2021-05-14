'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    OTP.init(
        {
            email: DataTypes.STRING,
            code: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'OTP',
        }
    );
    return OTP;
};
