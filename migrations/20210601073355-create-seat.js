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
            col: {
                type: Sequelize.INTEGER,
            },
            row: {
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
                    key: 'id',
                },
                onDelete: 'SET NULL',
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
