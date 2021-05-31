import Product from '../../Models/Product';
import ProductCategory from '../../Models/ProductCategory';
import productRequestValidation from '../../../app/Requests/productRequestValidation';
import Validator from 'fastest-validator';
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';
import isLoggedIn from'../../../middlewares/isLoggedIn';

const ProductController = {

    index: async (req: any, res: any) => {
        try {
            const products = await Product.findAll();
            res.render("layouts/front/home", {
                pageTitle: "view all products",
                products: products,
                isLoggedIn: isLoggedIn
            })
        } catch (err) {
            console.log(err)
        }
    },

    create: async (req: any, res: any) => {
        try {
            const categories = ProductCategory.findAll();
            await res.render("panel/products/create", {
                pageTitle: "",
                categories: categories
            })
        } catch (err) {
            console.log(err)
        }
    },

    store: async (req: any, res: any) => {
        const validate = v.validate(req.body, productRequestValidation);
        if (validate) {
            try {
                await Product.create(req.body);
                res.redirect("panel/product")
            } catch (err) {
                return Handler.Error_503();
            }
        } else {
            res.render("panel/product/create", {
                pageTitle: 'product create',
                //path: "/register",
                errors: validate,
            });
        }
    },
    show: (req: any, res: any) => {
    },
    edit: (req: any, res: any) => {
    },
    update: (req: any, res: any) => {
    },
    destroy: (req: any, res: any) => {
    },
};

export = ProductController;
