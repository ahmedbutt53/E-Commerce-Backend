const admin = require('firebase-admin');

const isAuthenticated = async (req, res, next) => {
    const sessionCookie = req.cookies?.session || '';

    if (!sessionCookie) {
        return res.redirect('/login');
    }

    try {
        await admin.auth().verifySessionCookie(sessionCookie, true);
        next();
    } catch (error) {
        res.clearCookie('session');
        return res.redirect('/login');
    }
};

module.exports = { isAuthenticated };
