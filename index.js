const express = require('express');
const app = express();
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://kevinbai:victor-cardenas123@ds145072.mlab.com:45072/mydb", {useNewUrlParser: true});

// Serve any static files
app.use(express.static(path.join(__dirname, 'front-end/build')));
// Handle React routing, return all requests to React app
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
})
app.get('/clients', function(req, res) {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
});
app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
});

// get clients

var router = require("./js/routes/routes");
app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running on port " + port));