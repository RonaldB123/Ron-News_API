const express = require('express');

const app = express();

const {getTopics} = require("./controller/topics-controller");
const {getEndpoints} = require("./controller/api-controller");


app.get("/api/topics", getTopics);

app.get("/api", getEndpoints)


app.use((err, req, res, next) =>{
    res.status(500).send({err});
})

module.exports = app;