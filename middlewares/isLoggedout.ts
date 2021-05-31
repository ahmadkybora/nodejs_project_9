const isLoggedOut = (req: any, res: any, next: any) => {
    if (req.session.isLoggedIn) {
        res.redirect('back');
    } else {
        next();
    }
};

export = isLoggedOut;

