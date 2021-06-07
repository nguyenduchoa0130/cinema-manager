'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Seats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            symbol: {
                type: Sequelize.STRING,
            },
            row: {
                type: Sequelize.INTEGER,
            },
            col: {
                type: Sequelize.INTEGER,
            },
            isOrder: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            cinemaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cinemas',
                    key: id,
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            showtimesId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Showtimes',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
        await queryInterface.dropTable('Seats');
    },
};
