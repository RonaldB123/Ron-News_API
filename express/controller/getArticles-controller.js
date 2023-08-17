const {articleData} = require("../model/getArticles-model");


exports.getArticles = (req, res) =>{
    const {topic} = req.query;
    articleData().then((articles) =>{
        res.status(200).send({articles});
    })
}