const express = require("express");
const path = require("path");
const db = require('./firebaseConfig');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});


app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "products.html"));
});


app.get("/products/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "product-details.html"));
});

// Test Firebase connection
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
