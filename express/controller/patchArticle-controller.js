const {patchArticleById} = require("../model/patchArticle-model");


exports.patchArticle = (req, res, next) =>{
    const {article_id} = req.params;
    const {body} = req;

    patchArticleById(article_id, body).then((data)=>{
        res.status(201).send({data});
    })
}