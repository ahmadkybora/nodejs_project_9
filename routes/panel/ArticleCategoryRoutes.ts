const express = require('express');
const router = express.Router();
import ArticleCategoryController from '../../app/Controllers/Panel/ArticleCategoryController';
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/', isLoggedIn, ArticleCategoryController.index);
router.get('/show/:id', isLoggedIn, ArticleCategoryController.show);
router.get('/create/', isLoggedIn, ArticleCategoryController.create);
router.post('/store', isLoggedIn, ArticleCategoryController.store);
router.get('/edit/:id', isLoggedIn, ArticleCategoryController.edit);
router.post('/update/:id', isLoggedIn, ArticleCategoryController.update);
router.get('/destroy/:id', isLoggedIn, ArticleCategoryController.destroy);

export = router;

