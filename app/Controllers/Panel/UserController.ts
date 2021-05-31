import User from '../../Models/UserModel';
//const mongoose = require('mongoose');
//const EmployeeDB = mongoose.model('Employees');
import Handler from '../../../app/Exceptions/Handler';
import userRequestValidation from '../../../app/RequestsValidations/userRequestValidation';

const UserController = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
}

async function index(req: any, res: any) {

    /*res.render("panel/users", {

    });*/

    User.findAll()
        .then(users => {
            res.render("panel/users", {
                users: users
            })
        }).catch(err => {
        console.log(err)
    });

/*    User.findAll()
        .then(users => {
            res.json({
                state: true,
                message: "success",
                data: users,
            })
        }).catch(err => {
        console.log(err)
    });*/

    /*EmployeeDB.find()
        .then(employees => {
            res.send(employees);
        });*/
};

async function show(req: any, res: any) {
    /*EmployeeDB.findOne({
        _id: req.params.id
    }).then(employee => {
        res.send(employee);
    })*/

    try {
        const user = await User.findByPk(req.params.id);
        res.render("panel/users/show", {
            state: true,
            message: "success",
            user: user,
        });

    } catch (err) {
        Handler.baseError(err);
    }

/*
    await User.findByPk(req.params.id)
        .then(user => {
            res.json({
                state: true,
                message: "success",
                data: user,
            })
        }).catch(err => {
            console.log(err)
        });
*/

};

function create(req: any, res: any) {
    res.render('panel/users/create');
};

exports.store = async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    userRequestValidation.validate(newUser);
console.log(userRequestValidation.validate(newUser))
    await User.create(newUser)
        .then(user => {
            if(user)
                res.redirect("/panel/users")
        })
        .catch((err:any) => {
            console.log(err)
        });
};

async function edit(req: any, res: any){
    await User.findByPk(req.params.id)
        .then((user: any) => {
            res.render('panel/users/edit', {
                user: user
            });
        }).catch((err: any) => {
            console.log(err)
        });
};

async function update(req: any, res: any){
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/users')
    }catch (err) {
        console.log(err)
    }
};

async function destroy(req: any, res: any){
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/users')
    } catch (err) {
        console.log(err)
    }
};

export = UserController;
