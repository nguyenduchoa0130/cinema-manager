'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasOne(models.OTP, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Role, {
                foreignKey: 'roleId',
            });
            this.hasMany(models.Booking, {
                foreignKey: 'userId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
			facebookId: DataTypes.STRING, 
			googleId: DataTypes.STRING,
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
