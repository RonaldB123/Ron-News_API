const {getCommentsData} = require("../model/commentByArId-model");

exports.getCommentsByArticleId = (req, res, next) =>{
    const {article_id} = req.params;
    getCommentsData(article_id).then((comments) =>{
        res.status(200).send({comments});
    }).catch((err) =>{
        next(err);
    })
}