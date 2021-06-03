import express from 'express';
const router = express.Router();
import EmployeeController = require('../../app/Controllers/Panel/EmployeeController');
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/captcha.png', EmployeeController.getCaptcha);
router.get('/', isLoggedIn, EmployeeController.index);
router.get('show/:id', isLoggedIn, EmployeeController.show);
router.get('/create', isLoggedIn, EmployeeController.create);
router.post('/store', isLoggedIn, EmployeeController.store);
router.get('/edit/:id', isLoggedIn, EmployeeController.edit);
router.post('/update/:id', isLoggedIn, EmployeeController.update);
router.get('/destroy/:id', isLoggedIn, EmployeeController.destroy);

export = router;

