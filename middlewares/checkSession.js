const checkSession = async (req, res, next) => {
    const session = req.cookies.session;

    if (!session) {
        res.redirect('/auth/login')
    }
};

module.exports = {checkSession}