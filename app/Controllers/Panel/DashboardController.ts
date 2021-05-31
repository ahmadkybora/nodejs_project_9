//const isLoggedIn = require('../../../middlewares/sessions/isLoggedIn');
const {formatDate} = require('../../../helpers/jalali');
import isLoggedIn from '../../../middlewares/isLoggedIn';

const DashboardController = {
    index
};

function index(req: any, res: any) {
    res.render("panel/dashboard", {
        message: req.flash("success"),
        formatDate,
        isLoggedIn,
    });
}

export = DashboardController;

