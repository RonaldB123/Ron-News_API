const {getCommentsData} = require("../model/commentByArId-model");
const {checkArticleExists} = require("../model/checkArticleExists-model");

exports.getCommentsByArticleId = (req, res, next) =>{
    const {article_id} = req.params;
    const promises = [getCommentsData(article_id)]
    
    if(article_id){
        promises.push(checkArticleExists(article_id));
    }
    
    Promise.all(promises).then((comments) =>{
        res.status(200).send({comments: comments[0].rows})
    }).catch((err) =>{
        next(err);
    })
}