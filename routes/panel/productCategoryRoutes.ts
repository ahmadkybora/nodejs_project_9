import express from 'express';
const router = express.Router();
import ProductCategoryController from '../../app/Controllers/Panel/ProductCategoryController';
import isLoggedIn from '../../middlewares/isLoggedIn';
//import productCategoryRequestValidation from '../../app/Requests/productCategoryRequest';

router.post('/category-search', isLoggedIn, ProductCategoryController.search);
router.get('/', isLoggedIn, ProductCategoryController.index);
//router.get('/show/:id', isLoggedIn, ProductCategoryController.show);
router.get('/create', isLoggedIn, ProductCategoryController.create);
router.post('/store', isLoggedIn, ProductCategoryController.store);
router.get('/edit/:id', isLoggedIn, ProductCategoryController.edit);
router.post('/update/:id', isLoggedIn, ProductCategoryController.update);
router.get('/destroy/:id', isLoggedIn, ProductCategoryController.destroy);

export = router;
