import debug from 'debug';
import express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
//import mongoose from 'mongoose';
//import fs from 'fs';
//import flash from 'flash';
//import session from 'express-session';
import winston from 'winston';
//import sequelize from 'sequelize-typescript';
//import Sequelize from 'sequelize';

import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
} from "sequelize";

const app = express();
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Sequelize.sync();

/*Sequelize
    .sync()
    .then(() => {
        console.log('Mysql Connected.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });*/

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'resources/views'));
app.set("view engine", "ejs");

/*if(process.env.NODE_ENV === "development") {
    debug("MOrgan Enabled");
    app.use(morgan("combine", {stream: winston.stream}))
}*/

debug("Connected To Database");

const environment = process.env.NODE_ENV;
if (environment !== 'production') {
    app.use(logger('dev'));
}

// Load routes
app.use('/', require('./routes/front/homeRoutes'));
app.use('/about', require('./routes/front/homeRoutes'));
app.use("/errors", require('./routes/errors/errorRoutes'));
app.use('', require('./routes/auth/authRoutes'));
app.use('/panel/dashboard', require('./routes/panel/dashboardRoutes'));
app.use('/panel/employees', require('./routes/panel/employeeRoutes'));
app.use('/panel/users', require('./routes/panel/userRoutes'));
app.use('/panel/brands', require('./routes/panel/brandRoutes'));
app.use('/panel/product-categories', require('./routes/panel/productCategoryRoutes'));
app.use('/panel/products', require('./routes/panel/productRoutes'));
app.use('/panel/article-categories', require('./routes/panel/articleCategoryRoutes'));
app.use('/panel/articles', require('./routes/panel/articleRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});

export = app;
