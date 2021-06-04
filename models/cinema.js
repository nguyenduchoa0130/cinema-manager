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
            hooks: {
                afterCreate(cinema, options) {
                    let { row, col, id } = cinema;
                    let seats = [];
                    let letter = 'A';
                    for (let i = 0; i < row; i++) {
                        for (let j = 0; j < col; j++) {
                            seats.push({
                                symbol: `${letter}${1}${j}`,
                                row: i,
                                col: j,
                                cinemaId: id,
                            });
                        }
                        letter = nextChar(letter);
                    }
                    sequelize.models.Seat.bulkCreate(seats);
                },
            },
        }
    );
    return Cinema;
};
