require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASS,
        database: process.env.DEV_DB,
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: process.env.PROD_USER,
        password: process.env.PROD_PASS,
        database: process.env.PROD_DB,
        host: process.env.PROD_HOST,
        port: process.env.PROD_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
