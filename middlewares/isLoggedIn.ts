const isLoggedIn = (req: any, res: any, next: any) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

export = isLoggedIn;

