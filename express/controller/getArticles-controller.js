const {articleData} = require("../model/getArticles-model");


exports.getArticles = (req, res) =>{
    articleData().then((articles) =>{
        res.status(200).send({articles});
    })
}