'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('StatusFilms', [
            {
                id: 'SAP_CONG_CHIEU',
                statusName: 'Sắp Công Chiếu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'DANG_CONG_CHIEU',
                statusName: 'Đang Công Chiếu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('StatusFilms', null, {});
    },
};
