const express = require('express');

const app = express();

const {getTopics} = require("./controller/topics-controller");


app.get("/api/topics", getTopics);


app.use((err, req, res, next) =>{
    res.status(500).send(err);
})

module.exports = app;