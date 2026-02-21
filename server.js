const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require('./firebaseConfig');
const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./routes/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "products.html"));
});

app.get("/products/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "product-details.html"));
});

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get('/test-firebase', async (req, res) => {
    try {
        const ref = db.ref('test');
        await ref.set({ message: 'Firebase connected successfully!' });
        const snapshot = await ref.once('value');
        res.json({ success: true, data: snapshot.val() });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
