import Employee from '../../Models/EmployeeModel';
import employeeRequest from '../../../app/Requests/employeeRequest';
import Validator from 'fastest-validator';
import Handler from '../../../app/Exceptions/Handler';
import sharp from 'sharp';
import Formidable from 'formidable';

const uuid = require('uuid').v4;
const captchapng = require('captchapng');

const EmployeeController = {
    getCaptcha,
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
};

async function getCaptcha(req: any, res: any) {
    let cp = Math.random() * 9000 + 1000;
    let p = new captchapng(80, 30, cp);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    let img = p.getBase64();
    let imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

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
        Handler.Error_404(req, res);
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
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields: any, files: any) => {
        const newEmp = {
            first_name: fields.first_name,
            last_name: fields.last_name,
            username: fields.username,
            email: fields.email,
            password: fields.password,
            confirmation_password: fields.confirmation_password,
            home_address: fields.home_address,
            work_address: fields.work_address,
        };

        const v = new Validator();
        const validate = v.validate(newEmp, employeeRequest);

        if (validate === true) {

            let oldPath = fields.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_9/public/storage/product-categories/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    Employee.create({
                        first_name: fields.first_name,
                        last_name: fields.last_name,
                        username: fields.username,
                        email: fields.email,
                        password: fields.password,
                        confirmation_password: fields.confirmation_password,
                        home_address: fields.home_address,
                        work_address: fields.work_address,
                        image: newPath,
                    });
                    return res.redirect("/panel/product-categories");
                })
                .catch(() => {
                    return res.render("panel/employees/create", {
                        pageTitle: "employees",
                        errors: validate,
                    })
                });
        } else {
            return res.render("panel/employees/create", {
                pageTitle: "employees",
                errors: validate,
            })
        }
    });
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
