const express = require('express');

const app = express();

const {getTopics} = require("./controller/topics-controller");

const {getArticleById} = require("./controller/article-controller");

app.get("/api/topics", getTopics);




app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) =>{
    res.status(500).send(err);
})

module.exports = app;