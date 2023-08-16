const {addComment} = require("../model/postComment-model");
const {checkArticleExists} = require("../model/checkArticleExists-model");
const { commentData } = require("../../db/data/test-data");

exports.postCommentByArticleId = (req, res , next) =>{
    const body = req.body;
    const {article_id} = req.params;

    const promises = [addComment(article_id, body)]

    if(article_id){
        promises.push(checkArticleExists(article_id));
    }
    
    Promise.all(promises).then((commentData) =>{
        res.status(201).send({comment: commentData[0]})
    }).catch((err)=>{
        next(err)
    })
}