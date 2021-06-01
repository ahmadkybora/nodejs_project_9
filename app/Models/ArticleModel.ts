import { Sequelize, Model, DataTypes } from "sequelize";
const dbCon = require('../../database/connection');
//import ArticleCategoryModel from './ArticleCategoryModel';
import EmployeeModel from './EmployeeModel';

const Article = dbCon.define('Article', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'PENDING')
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

/*Article.belongsTo(ArticleCategoryModel, {
    foreignKey: 'categoryId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ArticleCategoryModel.hasMany(Article, {
    foreignKey: 'categoryId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});*/

Article.belongsTo(EmployeeModel, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

EmployeeModel.hasMany(Article, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export = Article;

