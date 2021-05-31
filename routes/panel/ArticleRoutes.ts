import express from 'express';
const router = express.Router();
import ArticleController from '../../app/Controllers/Panel/ArticleController';
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/', isLoggedIn, ArticleController.index);
router.get('/show/:id', isLoggedIn, ArticleController.show);
router.get('/create', isLoggedIn, ArticleController.create);
router.post('/store', isLoggedIn, ArticleController.store);
router.post('/edit/:id', isLoggedIn, ArticleController.edit);
router.post('/update/:id', isLoggedIn, ArticleController.update);
router.get('/destroy/:id', isLoggedIn, ArticleController.destroy);

export = router;

