const express = require("express");

const app = express();

app.post("/notes", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;