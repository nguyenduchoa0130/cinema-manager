'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            this.hasOne(models.User, {
                foreignKey: 'roleId',
                onDelete: 'SET NUll',
                onUpdate: 'CASCADE',
            });
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Role',
        }
    );
    return Role;
};
