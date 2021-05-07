'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin1@gmail.com',
                password: '123456',
                full_name: 'Nguyen Duc Hoa',
                phone: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'admin2@gmail.com',
                password: '123456',
                full_name: 'Nguyen Minh Hieu',
                phone: '12345567',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
