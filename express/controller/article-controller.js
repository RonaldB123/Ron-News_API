const {articleData} = require("../model/article-model");

exports.getArticleById = (req, res, next) =>{
    const {article_id} = req.params;

    articleData(article_id).then((article) =>{
        res.status(200).send({article});
    }).catch((err)=>{
        next(err);
    })
}