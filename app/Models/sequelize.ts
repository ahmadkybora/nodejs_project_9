import { Sequelize, Model, DataTypes } from "sequelize";
let config = require('../../config.js');
/*const _sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: '',
    database : 'nodejs_project_8',
    port: 3307,
    host: 'localhost',
});*/

/*const _sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 1000
    }
});

module.exports.getSeq = () => _sequelize ?? null;*/

export = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 1000
    }
});
