import { Sequelize, Model, DataTypes } from "sequelize";
const dbCon = require('../../database/connection');

const Employee = dbCon.define("Employee", {
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
        /*allowNull: false,
        required: true,*/
    },
    last_name: {
        type: DataTypes.STRING,
        /*allowNull: false,
        required: true,*/
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    home_address: {
        type: DataTypes.STRING
    },
    work_address: {
        type: DataTypes.STRING
    },
});

export = Employee;
