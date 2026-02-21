const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Show Login Page
router.get('/login', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../views/login.html'));
});

// Show Signup Page
router.get('/signup', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../views/signup.html'));
});

// Handle Login - Create Session Cookie
router.post('/login', async (req, res) => {
    const { idToken } = req.body;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
        res.cookie('session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ success: true, redirect: '/dashboard' });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Login failed: ' + error.message });
    }
});

// Handle Logout
router.post('/logout', (req, res) => {
    res.clearCookie('session');
    res.json({ success: true, redirect: '/login' });
});

module.exports = router;
