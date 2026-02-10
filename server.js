const express = require("express");
const path = require("path");

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


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
