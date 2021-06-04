'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cinemas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cinemaName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            row: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            col: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            clusterId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'CinemaClusters',
                    key: 'id',
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
        await queryInterface.dropTable('Cinemas');
    },
};
