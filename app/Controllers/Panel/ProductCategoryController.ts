import ProductCategory from "../../Models/ProductCategoryModel";
import Brand from "../../Models/BrandModel";
import Employee from "../../Models/EmployeeModel";
import productCategoryRequest from "../../../app/Requests/productCategoryRequest";
import Validator from "fastest-validator";

const v = new Validator();
//import Handler from "../../../app/Exceptions/Handler";
import sequelize from "sequelize";

const Op = sequelize.Op;
const uuid = require('uuid').v4;
import Formidable = require('formidable');
import sharp from 'sharp';
//let path = require("path");
import fs from 'fs';

const ProductCategoryController = {
    search,
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};

async function search(req: any, res: any) {
    const {search} = req.body;
    const page = +req.query.page || 1;
    const perPage = 1;

    try {
        const numberOfEmployees = await ProductCategory.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const categorySearch = await ProductCategory.findAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            include: Brand
        }, {
            limit: perPage,
            offset: ((page - 1) * perPage)
        });

        res.render("panel/product-categories", {
            path: '/panel/product-categories/category-search',
            title: "category-Search",
            categorySearch: categorySearch,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            //hasNextPage: perPage * (page < numberOfEmployees.count),
            hasNextPage: perPage * (numberOfEmployees.count),
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees.count / perPage),
            search: true,
        });
    } catch (err) {
        console.log(err)
    }
}

async function index(req: any, res: any) {
    const page: any = +req.query.page || 1;
    const perPage: any = 10;

    try {
        const numberOfEmployees = await ProductCategory.findAndCountAll();
        const categories = await ProductCategory.findAll({include: Brand}, {
                limit: perPage,
                offset: ((page - 1) * perPage)
            }
        );

        res.render("panel/product-categories", {
            path: '/panel/product-categories',
            title: "Product Categories",
            categories: categories,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: perPage * (numberOfEmployees.count),
            //hasNextPage: perPage * (page < numberOfEmployees.count),
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees.count / perPage),
            search: false,
        })

    } catch (err) {
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        res.render("panel/product-categories/create", {
            title: "Product Categories",
            brands: await Brand.findAll(),
            employees: await Employee.findAll(),
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req: any, res: any) {
    const brands = await Brand.findAll();
    const employees = await Employee.findAll();

    try {
        let form = new Formidable.IncomingForm();
        await form.parse(await req, (err, fields: any, files: any) => {
            if (typeof files.file !== 'undefined') {
                try {
                    const validate = v.validate(fields, productCategoryRequest);
                    if (validate === true) {
                        console.log(files);
                        let oldPath = files.file.path;
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        let fileName = `${uniqueSuffix}_${uuid()}_${files.file.name}`;
                        //let newPath = 'D:/nodejsProjects/nodejs_project_9/public/storage/product-categories/' + fileName;
                        let newPath = 'C:/nodejs_projects/nodejs_project_9/public/storage/product-categories/' + fileName;
                       /* let path = Buffer.from(newPath);
                        console.log(path);
                        sharp(path).jpeg({quality: 1}).toFile();*/
                        fs.rename(oldPath, newPath, function (err: any) {
                            if (err) {
                                console.log(err);
                            } else {
                                ProductCategory.create({
                                    employeeId: fields.employeeId,
                                    name: fields.name,
                                    image: newPath,
                                    status: fields.status,
                                    brandId: fields.brandId
                                }, {
                                    include: {
                                        model: Brand
                                    }
                                });
                            }
                        });
                        res.redirect("/panel/product-categories");
                    } else {
                        res.render("panel/product-categories/create", {
                            title: "Product Categories",
                            brands: brands,
                            employees: employees,
                            errors: validate,
                        });
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        });
    } catch (err) {
        console.log(err)
    }
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
    try {
        const brands = await Brand.findAll();
        const category = await ProductCategory.findByPk(req.params.id, {include: Brand});
        console.log(category);
        res.render('panel/product-categories/edit', {
            title: "editEmployees",
            category: category,
            brands: brands,
        });
    } catch (err) {
        console.log(err)
    }
}

async function update(req: any, res: any) {
    try {
        await ProductCategory.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/product-categories");
    } catch (err) {
        console.log(err)
    }
}

async function destroy(req: any, res: any) {
    try {
        await ProductCategory.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/product-categories");
    } catch (err) {
        console.log(err)
    }
}

export = ProductCategoryController;
