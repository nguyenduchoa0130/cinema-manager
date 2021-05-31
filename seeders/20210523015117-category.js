'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            {
                categoryName: 'Khác',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryName: 'Hành Động',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryName: 'Tình Cảm',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryName: 'Hài Hước',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryName: 'Phiêu Lưu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
