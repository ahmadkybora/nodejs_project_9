import Product from '../../Models/ProductModel';
import ProductCategory from '../../Models/ProductCategoryModel';
//import productRequest from '../../../app/Requests/productRequest';
import Validator from 'fastest-validator';
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';

const ProductController = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
};

async function index(req: any, res: any) {
    try {
        const products = await Product.findAll();
        res.render("panel/products", {
            title: "displayEmployees",
            products: products,
        });

    } catch (err) {
        //Handler.baseError(err);
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        const categories = await ProductCategory.findAll();
        console.log(categories);
        res.render("panel/products/create", {
            pageTitle: "",
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req: any, res: any) {
    /*const validate = v.validate(req.body, productRequestValidation);
    if (validate) {*/
        try {
            await Product.create(req.body);
            res.redirect("/panel/product")
        } catch (err) {
            return Handler.Error_404(req, res);
        }
    /*} else {
        res.render("panel/product/create", {
            pageTitle: 'product create',
            //path: "/register",
            errors: validate,
        });
    }*/
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
}

async function update(req: any, res: any) {
}

async function destroy(req: any, res: any) {
}

export = ProductController;
