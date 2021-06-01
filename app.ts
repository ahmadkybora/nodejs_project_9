import debug from 'debug';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
//import mongoose from 'mongoose';
//import fs from 'fs';
//const flash = require('flash');
//import session from 'express-session';
//import winston from 'winston';
import sequelize from './database/connection';
const session = require('express-session');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    PORT = 8000,
    NODE_ENV = 'development',
    SESS_LIFETIME = TWO_HOURS,
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quit,it\'asecret!',
} = process.env;
const IN_PROD = NODE_ENV === 'production';

const app = express();
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


sequelize
    .sync()
    .then(() => {
        console.log('Mysql Connected.');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

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

app.use(session({
    name: SESS_NAME,
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    },
    //store: new MongoStore({mongooseConnection: mongoose.connection})
}));
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
