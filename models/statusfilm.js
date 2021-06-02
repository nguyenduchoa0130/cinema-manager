'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StatusFilm extends Model {
        static associate(models) {
            this.hasMany(models.Film, {
                foreignKey: 'statusKey',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    StatusFilm.init(
        {
            key: DataTypes.STRING,
            statusName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'StatusFilm',
        }
    );
    return StatusFilm;
};
