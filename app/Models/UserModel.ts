import { Sequelize, Model, DataTypes } from "sequelize";
const dbCon = require('../../database/connection');

const User = dbCon.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    first_name: {
        type: DataTypes.STRING,
        //required: true,
        //unique: true
    },
    last_name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        //unique
    },
    email: {
        type: DataTypes.STRING,
        //unique
    },
    image: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

export = User;

