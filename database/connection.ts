let config = require('./config.ts');
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
        dialect: 'mysql',
        dialectOptions: {
            connectTimeout: 1000
        }
    });

module.exports = sequelize;
