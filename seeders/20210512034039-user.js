'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                email: 'nguyenduchoa0130@gmail.com',
                password: '$2b$10$Wsdn69FJHfLfxNp857d8TuFPFQ50zqoSiDVFh2FtW4F/IjXl2OUPO',
                fullName: 'Nguyen Minh Hieu',
                phone: '0866994350',
                roleId: 1,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
