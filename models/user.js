'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasOne(models.OTP, {
                foreignKey: 'userId',
            });
            this.belongsTo(models.Role, {
                foreignKey: 'roleId',
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
            phone: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
