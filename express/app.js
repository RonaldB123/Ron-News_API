const express = require('express');

const app = express();

const {getTopics} = require("./controller/topics-controller");
const {getEndpoints} = require("./controller/api-controller");
const {getArticleById} = require("./controller/article-controller");
const {getCommentsByArticleId} = require("./controller/commentByArId-controller");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) =>{
    if(err.status === 404){
        res.status(err.status).send({message: err.message});
    }else if(err.code === '22P02'){
        res.status(400).send({message: "Bad Request"})
    }
})




app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use((err, req, res, next) =>{
    if(err.code === "22P02"){
        res.status(400).send({message: "Bad Request"});
    }else if(err.status === 404){
        res.status(404).send({message: "Not Found"})
    }
})

app.use((err, req, res, next) =>{
    res.status(500).send({err});
})

module.exports = app;