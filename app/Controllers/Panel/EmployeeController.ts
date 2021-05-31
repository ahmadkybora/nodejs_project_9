import Employee from '../../Models/EmployeeModel';
import employeeRequest from '../../../app/Requests/employeeRequest';
import Validator from 'fastest-validator';
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';
//import captchapng from 'captchapng';

const EmployeeController = {
    //getCaptcha,
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
};

// async function getCaptcha(req: any, res: any) {
//     var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000));
//     p.color(0, 0, 0, 0);
//     p.color(80, 80, 80, 255);
//
//     var img = p.getBase64();
//     var imgbase64 = new Buffer(img, 'base64');
//     res.writeHead(200, {
//         'Content-Type': 'image/png'
//     });
//     res.end(imgbase64);
// }

async function index(req: any, res: any) {
    const page = +req.query.page || 1;
    const perPage = 1;

    try {
        const numberOfEmployees = await Employee.findAndCountAll();
        const employees = await Employee.findAll({
            offset: ((page - 1) * perPage), limit: perPage
        });

        res.render("panel/employees", {
            title: "displayEmployees",
            employees: employees,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: perPage * page < numberOfEmployees,
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees / perPage)
        });

    } catch (err) {
        //Handler.baseError(err);
        console.log(err)
    }
}

async function show(req: any, res: any) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        res.render("panel/employees/show", {
            employee: employee
        })
    } catch (err) {
        Handler.Error_404(req, res);
    }
}

async function create(req: any, res: any) {
    await res.render('panel/employees/create', {
        title: 'Register'
    });
}

async function store(req: any, res: any) {
    const validate = v.validate(req.body, employeeRequest);
    if (validate === true) {
        try {
            await Employee.create(req.body);
            res.redirect("/panel/employees")
        } catch (err) {
            console.log(err)
        }
    } else {
        return res.render("panel/employees/create", {
            pageTitle: "",
            errors: validate,
        })
    }
}

async function edit(req: any, res: any) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        res.render('panel/employees/edit', {
            title: "editEmployees",
            employee: employee
        });
    } catch (err) {
        console.log(err)
    }
}

async function update(req: any, res: any) {
    /*const validate = v.validate(req.body, employeeRequestValidation);
    if (validate === true) {*/
    try {
        await Employee.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        await Employee.findByPk(req.params.id);
        res.redirect("/panel/employees")
    } catch (err) {
        console.log(err)
    }
    /*} else {
        return res.render("panel/employees/edit", {
            pageTitle: "",
            errors: validate,
        })
    }*/
}

async function destroy(req: any, res: any) {
    try {
        await Employee.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/employees")
    } catch (err) {
        console.log(err)
    }
}


export = EmployeeController;
