const User = require('../../Models/UserModel');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/*require('dotenv').config();
require('env');*/
//const mongoose = require('mongoose');
//const UserDB = mongoose.model('UserDB');
//const sessionAuth = require('../../../middlewares/sessionAuth');
//const userRequestValidation = require('../../../app/RequestsValidations/userRequestValidation');
import userRequest from '../../../app/Requests/userRequest';
const Validator = require('fastest-validator');
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';

const AuthController = {
    handleLogin,
    rememberMe,
    showLoginForm,
    login,
    showRegisterForm,
    register,
    logout,
    showForgetPassword,
    forgetPassword,
    showResetPassword,
    resetPassword
};

function showLoginForm(req: any, res: any) {
    res.render("auth/login", {
        error: req.flash("error")
    });
}

async function login(req: any, res: any) {
    const body = req.body;
    const user = await User.findOne({
        where: {
            username: body.username
        }
    });

    //sessionAuth(user);

    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (!validPassword) {
            return Handler.Error_401(req, res);
            /*return res.status(422)
                .json({
                    state: false,
                    message: "your passwords is not match",
                    data: null,
                });*/
        }

        req.session.isLoggedIn = user.id;
        console.log(req.session.isLoggedIn);
        if (req.session.isLoggedIn) {
            req.flash("success", "you are logged in");
            res.redirect("/panel/dashboard");
            /*return res.status(200)
                .json({
                    state: true,
                    message: "your are logged in",
                    data: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                    },
                })*/
        }


        /*const token = generateAccessToken(user.username, user.id);
        user.token = token;
        user.save();

        if (token)
        {
            res.redirect("panel/dashboard");*/
        /*return res.status(200)
            .json({
                state: true,
                message: "your are logged in",
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    token: token,
                },
            });
    }*/
        else {
            return res.json({
                data: "no you cant"
            })
        }
    } else {
        //return Handler.Error_401(req, res);
    }
}

async function handleLogin(req: any, res: any, next: any) {
    await passport.authenticate("local", {
        successRedirect: "panel/dashboard",
        failureRedirect: "login",
        failureFlash: true
    })(req, res, next);
}

function rememberMe(req: any, res: any) {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expire = null;
    }

    res.redirect("/panel/dashboard")
}

function showRegisterForm(req: any, res: any) {
    res.render("auth/register");
}

async function register(req: any, res: any) {

    const validate = v.validate(req.body, userRequest);
    const errorArr = [];
    if (validate === true) {
        const {first_name, last_name, username, email, password, confirmation_password} = req.body;
        if (password !== confirmation_password) {
            errorArr.push({message: "کلمه های عبور یکسان نیستند"});
            return res.render("auth/register", {
                pageTitle: "ثبت نام کاربر",
                path: "/register",
                errors: errorArr,
            });
        }
        const hash = await bcrypt.hash(password, 10);
        User.create({first_name, last_name, username, email, password: hash});
        res.redirect("panel/dashboard");
    } else {
        res.render("auth/register", {
            pageTitle: "ثبت نام کاربر",
            path: "/register",
            errors: validate,
        });
    }

    /*await userRequestValidation
         .validate(req.body)
         .then(() => {
             res.redirect("panel/dashboard");
         })
         .catch((err) => {
             res.render("auth/register", {
                 pageTitle: "ثبت نام کاربر",
                 path: "/register",
                 errors: err.errors,
             });
         });*/
    /*const body = req.body;

    if (body.password !== body.confirmation_password) {
        return res.status(422)
            .json({
                state: false,
                message: "your passwords is not match",
                data: null,
            });
    }

    const user = new User(body);
    const salt = bcrypt.genSalt(10);
    user.password = bcrypt.hash(user.password, salt);
    user.save()
        .then(() => {
            return res.status(201)
                .json({
                    state: true,
                    message: "success",
                    data: null,
                });
        })
        .catch(err => {
            res.render("auth/register", {
                pageTitle: '',
                path: '/register',
                errors: err.errors,
            })
        });*/
}

function logout(req: any, res: any) {
    req.session.destroy(() => {
        //req.flash("success", "you are logged out")
        res.redirect('/login');
    });
    /*    req.logout();
        return res.status(200)
            .json({
                state: true,
                message: "you are logged out",
                data: null,
            });*/
}

function generateAccessToken(username: any, id: any) {
    //const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    /*const payload = { username: username, id: id};
    const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, options);*/

    return jwt.sign({
        username: username,
        id: id,
        /*iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)*/
    }, 'SECRET', {expiresIn: '2d'});
}

function showForgetPassword(req: any, res: any) {
    res.render("auth/forget-password", {
        pageTitle: "",
        path: "",
    })
}

async function forgetPassword(req: any, res: any) {

    const {email} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.render("auth/forget-password", {
            pageTitle: "",
            path: "",
        })
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    //sendEmail(user.first_name, user.last_name, user.email, 'فراموشی رمز عبور', )
}

function showResetPassword(req: any, res: any) {
    const p = req.body;
    res.send(p);
}

async function resetPassword(req: any, res: any) {
    const p = req.body;
    res.send(p);
}

module.exports = AuthController;
