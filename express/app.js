const express = require('express');

const app = express();

const {getTopics} = require("./controller/topics-controller");
const {getEndpoints} = require("./controller/api-controller");
const {getArticles} = require("./controller/getArticles-controller");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints)



app.get("/api/articles", getArticles);

app.use((err, req, res, next) =>{
    res.status(500).send({err});
})

module.exports = app;