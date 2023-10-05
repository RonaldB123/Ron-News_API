const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json())

const {getTopics} = require("./controller/topics-controller");
const {getEndpoints} = require("./controller/api-controller");
const {getArticles} = require("./controller/getArticles-controller");
const {getArticleById} = require("./controller/article-controller");
const {getCommentsByArticleId} = require("./controller/commentByArId-controller");
const {deleteComment} = require("./controller/deleteComment-controller");
const {postCommentByArticleId} = require("./controller/postComment-controller");
const {patchArticle} = require('./controller/patchArticle-controller');
const {getAllUsers} = require("./controller/users-controller");

const {handleCustomErrors} = require("./errHandlers/handleCustomErrors");
const {handleSqlErrors} = require('./errHandlers/handleSqlErrors');

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

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use(handleCustomErrors);
app.use(handleSqlErrors);


app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use(handleCustomErrors);
app.use(handleSqlErrors);

app.patch("/api/articles/:article_id", patchArticle);

app.use(handleCustomErrors);
app.use(handleSqlErrors)

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handleCustomErrors);
app.use(handleSqlErrors);

app.get("/api/users", getAllUsers);

app.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).send({err});
})

module.exports = app;