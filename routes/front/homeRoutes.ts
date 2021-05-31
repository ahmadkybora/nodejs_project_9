import express from 'express';
const router = express.Router();
const HomeController = require('../../app/Controllers/Front/HomeController');

router.get('/p', HomeController.index);
router.get('/contact-us', HomeController.getContactUs);
router.post('/contact-us', HomeController.postContactUs);
router.get('/captcha.png', HomeController.getCaptcha);

module.exports = router;
