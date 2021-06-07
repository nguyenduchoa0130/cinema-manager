'use strict';
const { Model } = require('sequelize');
const helper = require('../config/helper');
module.exports = (sequelize, DataTypes) => {
    class Showtimes extends Model {
        static associate(models) {
            this.hasMany(models.Seat, {
                foreignKey: 'showtimesId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Showtimes.init(
        {
            filmId: DataTypes.INTEGER,
            systemId: DataTypes.INTEGER,
            clusterId: DataTypes.INTEGER,
            cinemaId: DataTypes.INTEGER,
            timeStart: DataTypes.DATE,
            timeEnd: DataTypes.DATE,
            priceTicket: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Showtimes',
            hooks: {
                afterBulkCreate(listShowtimes, options) {
                    for (let showtimes of listShowtimes) {
                        let { cinemaId, id } = showtimes;
                        sequelize.models.Cinema.findByPk(cinemaId)
                            .then((cinema) => {
                                if (cinema) {
                                    let { row, col } = cinema;
                                    let letter = 'A';
                                    let seats = [];
                                    for (let i = 0; i < row; i++) {
                                        for (let j = 0; j < col; j++) {
                                            seats.push({
                                                symbol: `${letter}${i}${j}`,
                                                row: i,
                                                col: j,
                                                cinemaId,
                                                showtimesId: id,
                                            });
                                        }
                                        letter = helper.nextChar(letter);
                                    }
                                    sequelize.models.Seat.bulkCreate(seats);
                                } else {
                                    console.log('Không tìm thấy rạp phim');
                                }
                            })
                            .catch((err) => {
                                console.log('Có 1 lỗi đã xảy ra khi thao tác ' + err.message);
                            });
                    }
                },
            },
        }
    );
    return Showtimes;
};
