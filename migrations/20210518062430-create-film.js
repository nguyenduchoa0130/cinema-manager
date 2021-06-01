'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Films', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            filmName: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            releaseYear: {
                type: Sequelize.STRING,
            },
            duration: {
                type: Sequelize.STRING,
            },
            director: {
                type: Sequelize.STRING,
            },
            actors: {
                type: Sequelize.STRING,
            },
            thumbnail: {
                type: Sequelize.STRING,
                defaulValue: null,
            },
            poster: {
                type: Sequelize.STRING,
                defaulValue: null,
            },
            trailer: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            premiere: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            desc: {
                type: Sequelize.STRING,
                defaultValue: null,
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
        await queryInterface.dropTable('Films');
    },
};
