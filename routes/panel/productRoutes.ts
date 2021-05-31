import express from 'express';
const router = express.Router();
import ProductController from '../../app/Controllers/Panel/ProductController';
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/', isLoggedIn, ProductController.index);
router.get('/show/:id', isLoggedIn, ProductController.show);
router.get('/create', isLoggedIn, ProductController.create);
router.post('/store', isLoggedIn, ProductController.store);
router.get('/edit/:id', isLoggedIn, ProductController.edit);
router.post('/update/:id', isLoggedIn, ProductController.update);
router.get('/destroy/:id', isLoggedIn, ProductController.destroy);

export = router;
