import isLoggedOut from '../middlewares/isLoggedOut';

const isLoggedIn = (req: any, res: any, next: any) => {
    if (!req.session.isLoggedIn) {
    //if (isLoggedOut) {
        res.redirect('/login');
    } else {
        next();
    }
};

export = isLoggedIn;

