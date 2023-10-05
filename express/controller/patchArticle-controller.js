const {patchArticleById} = require("../model/patchArticle-model");
const {checkArticleExists} = require("../model/checkArticleExists-model");

exports.patchArticle = (req, res, next) =>{
    const {article_id} = req.params;
    const body = req.body;
    
    checkArticleExists(article_id).then(()=>{
        return patchArticleById(article_id, body);
    }).then((data)=>{
        res.status(200).send({article: data});
    }).catch((err)=>{
        next(err)
    })

}