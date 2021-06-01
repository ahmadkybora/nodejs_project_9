import isLoggedIn from '../middlewares/isLoggedIn';

const isLoggedOut = (req: any, res: any, next: any) => {
    if (req.session.isLoggedIn) {
    //if (isLoggedIn) {
        res.redirect('back');
    } else {
        next();
    }
};

export = isLoggedOut;

