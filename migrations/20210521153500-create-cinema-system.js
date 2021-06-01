'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CinemaSystems', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            systemName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            logoSrc: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            logo: {
                type: Sequelize.BLOB,
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
        await queryInterface.dropTable('CinemaSystems');
    },
};
