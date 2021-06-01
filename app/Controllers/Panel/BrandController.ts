import Brand from '../../Models/BrandModel';
//import brandRequest from '../../../app/Requests/brandRequestValidation';
//import Validator from 'fastest-validator';
//const v = new Validator();
//import Handler from '../../../app/Exceptions/Handler';

const BrandController = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};

async function index(req: any, res: any) {
    try {
        const brands = await Brand.findAll();
        res.render('panel/brands', {
            title: 'brands',
            brands: brands
        })
    } catch (err) {
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        await res.render('panel/brands/create', {
            pageTitle: 'brand create',
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req: any, res: any) {
/*    const validate = v.validate(req.body, brandRequestValidation);
    if (validate === true) {*/
        try {
            await Brand.create(req.body);
            res.redirect("/panel/brands");
        } catch (err) {
            console.log(err);
        }
    /*}
    else {
        res.render("panel/brands/create", {
            pageTitle: 'brand create',
            //path: "/register",
            errors: validate,
        });
    }*/
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
    try {
        const brand = await Brand.findByPk(req.params.id);
        res.render("panel/brands/edit", {
            pageTitle: "",
            brand: brand
        })
    }catch (err) {
        console.log(err)
    }
}

async function update(req: any, res: any) {
    try {
        await Brand.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/brands')
    }catch (err) {
        console.log(err)
    }
}

async function destroy(req: any, res: any) {
    try {
        await Brand.destroy({
            where: {
                id: req.params.id
            }
        });
    }catch (err) {
        console.log(err)
    }

    res.redirect("/panel/brands");
}

export = BrandController;
