'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
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
            refreshToken: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
