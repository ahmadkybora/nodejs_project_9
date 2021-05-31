import express from 'express';
const router = express.Router();
import BrandController from '../../app/Controllers/Panel/BrandController';
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/', isLoggedIn, BrandController.index);
//router.get('/:id', isLoggedIn, BrandController.show);
router.get('/create', isLoggedIn, BrandController.create);
router.post('/store', isLoggedIn, BrandController.store);
router.get('/edit/:id', isLoggedIn, BrandController.edit);
router.post('/update/:id', isLoggedIn, BrandController.update);
router.get('/destroy/:id', isLoggedIn, BrandController.destroy);

export = router;

