'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            facebookId: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'The password must have at least 6 characters',
                    },
                },
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            roleId: {
                type: Sequelize.INTEGER,
                defaultValue: 2,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Roles',
                    key: 'id',
                },
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('Users');
    },
};
