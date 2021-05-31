'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            filmId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Films',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpDate: 'CASCADE',
            },
            poster: {
                type: Sequelize.BLOB,
                defaultValud: null,
            },
            thumbnail: {
                type: Sequelize.BLOB,
                defaultValud: null,
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
        await queryInterface.dropTable('Images');
    },
};
