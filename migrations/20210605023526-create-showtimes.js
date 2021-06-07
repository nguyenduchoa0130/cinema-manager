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
            filmId: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            systemId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CinemaSystems',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            clusterId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CinemaClusters',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            cinemaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cinemas',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            timeStart: {
                type: Sequelize.DATE,
                defaultValue: null,
            },
            timeEnd: {
                type: Sequelize.DATE,
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
