import express from 'express';
const router = express.Router();
import DashboardController from '../../app/Controllers/Panel/DashboardController';
import isLoggedIn from '../../middlewares/isLoggedIn';

router.get('/', isLoggedIn, DashboardController.index);

export = router;
