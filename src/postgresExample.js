// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize');
const driver = new Sequelize(
    'herois',
    'wellington',
    '123456',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIndentifiers: false,
        operator
    }
);