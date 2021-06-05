'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Showtimes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cinemaId: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            filmId: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            shiftId: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            priceTicket: {
                type: Sequelize.BIGINT,
                defaultValue: 0,
                validate: {
                    isIntegerPositive(value) {
                        if (value <= 0 && Number.isInteger(value)) {
                            throw new Error('Giá vé phải là 1 số nguyên lớn hơn 0');
                        }
                    },
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Showtimes');
    },
};
