import { Sequelize, Model, DataTypes } from "sequelize";
const dbCon = require('../../database/connection');
import BrandModel from './BrandModel';
import EmployeeModel from './EmployeeModel';

const ProductCategory = dbCon.define('ProductCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    brandId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'brands',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
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

ProductCategory.belongsTo(BrandModel, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BrandModel.hasMany(ProductCategory, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ProductCategory.belongsTo(EmployeeModel, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

EmployeeModel.hasMany(ProductCategory, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export = ProductCategory;

/*
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./sequelize');
const BrandModel = require('./BrandModel');

class ProductCategory extends Model {
}

ProductCategory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            required: true,
        },
        brandId: {
            type: DataTypes.UUID,
            unique: true,
            references: {
                model: 'brands',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
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
    },
    {
        sequelize: sequelize,
        modelName: 'ProductCategory',
    });

ProductCategory.belongsTo(BrandModel, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BrandModel.hasMany(ProductCategory, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = ProductCategory;
*/

/*const {DataTypes, Model} = require('sequelize');
const sequelize = require('./sequelize');
const BrandModel = require('./BrandModel');

'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        /!**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *!/
        static associate(models) {
            // define association here
        }
    };
    ProductCategory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            required: true,
        },
        brandId: {
            type: DataTypes.UUID,
            unique: true,
            references: {
                model: 'brands',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
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
    }, {
        sequelize,
        modelName: 'ProductCategory',
    });
    return ProductCategory;
};*/
