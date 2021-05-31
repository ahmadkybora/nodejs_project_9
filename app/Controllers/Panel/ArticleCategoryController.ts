import articleCategory from '../../Models/articleCategory';
import articleCategoryRequestValidation from '../../../app/Requests/articleCategoryRequestValidation';
import Validator from 'fastest-validator';
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';

const articleCategoryController = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};

async function index(req: any, res: any) {
    const categories = await articleCategory.findAll();
    try {
        res.render("panel/article-categories", {
            pageTitle: "",
            categories: categories,
        })
    } catch (err) {
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        await res.render("panel/article-categories/create", {
            pageTitle: "",
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req: any, res: any) {
    const validate = v.validate(req.body, articleCategoryRequestValidation);
    if (validate) {
        try {
            await articleCategory.create(req.body);
            res.redirect("/panel/article-categories")
        } catch (err) {
            return Handler.Error_503();
        }
    } else {
        res.render("panel/article-categories/create", {
            pageTitle: 'article-categories create',
            //path: "/register",
            errors: validate,
        });
    }
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
    try {
        const category = await articleCategory.findByPk(req.params.id);
        res.render("panel/article-categories/edit", {
            pageTitle: 'article-categories create',
            category: category,
        });
    } catch (err) {
        console.log(err)
    }
}

async function update(req: any, res: any) {
    try {
        await articleCategory.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.redirect("/panel/article-categories")
    } catch (err) {
        console.log(err)
    }
}

async function destroy(req: any, res: any) {
    try {
        await articleCategory.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.redirect("/panel/article-categories")
    } catch (err) {
        console.log(err)
    }
}

export = articleCategoryController;
