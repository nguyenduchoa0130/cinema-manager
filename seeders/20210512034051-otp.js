'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'OTPs',
            [
                {
                    email: 'nguyenduchoa1208@gmail.com',
                    code: '111111',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('OTPs', null, {});
    },
};
