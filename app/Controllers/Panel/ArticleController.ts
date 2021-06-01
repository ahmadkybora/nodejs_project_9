import Article from '../../Models/ArticleModel';
//import ArticleCategory from '../../Models/ArticleCategoryModel';
//import articleRequestValidation from '../../../app/Requests/articleRequest';
//import Validator = require('fastest-validator');
//const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';

const ArticleController = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};

async function index(req: any, res: any) {
    const articles = await Article.findAll();
    try {
        res.render("panel/articles", {
            pageTitle: "",
            articles: articles,
        })
    } catch (err) {
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        //const categories = await ArticleCategory.findAll();
        await res.render("panel/articles/create", {
            pageTitle: "",
            //categories: categories
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req: any, res: any) {
    /*const validate = v.validate(req.body, articleRequestValidation);
    if (validate) {*/
        try {
            await Article.create(req.body);
            res.redirect("panel/article")
        } catch (err) {
            return Handler.Error_503(req, res);
        }
    /*} else {
        res.render("panel/articles/create", {
            pageTitle: 'article create',
            errors: validate,
        });
    }*/
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
    try {
        const article = Article.findByPk(req.params.id);
        res.render("panel/articles/edit", {
            pageTitle: 'article create',
            article: article,
        });
    }catch (err) {
       console.log(err)
    }
}

async function update(req: any, res: any) {
    try {
        Article.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.redirect('/panel/articles')
    }catch (err) {
        console.log(err)
    }
}

async function destroy(req: any, res: any) {
    try {
        Article.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/articles')
    }catch (err) {
        console.log(err)
    }
}

export = ArticleController;
