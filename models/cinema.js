'use strict';
const { Model, Op } = require('sequelize');
const { QueryInterface } = require('sequelize');
function nextChar(c) {
    let charCode = c.charCodeAt(0);
    charCode++;
    return String.fromCharCode(charCode);
}
module.exports = (sequelize, DataTypes) => {
    class Cinema extends Model {
        static associate(models) {
            this.belongsTo(models.CinemaCluster, {
                foreignKey: 'clusterId',
            });
            this.hasMany(models.Seat, {
                foreignKey: 'cinemaId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasMany(models.Shift, {
                foreignKey: 'cinemaId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Cinema.init(
        {
            cinemaName: DataTypes.STRING,
            row: DataTypes.INTEGER,
            col: DataTypes.INTEGER,
            clusterId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Cinema',
        }
    );
    return Cinema;
};
