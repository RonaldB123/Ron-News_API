const {addComment} = require("../model/postComment-model");

exports.postCommentByArticleId = (req, res , next) =>{
    const body = req.body;
    const {article_id} = req.params;

    addComment(article_id, body).then((comment) =>{
        res.status(200).send({comment: comment[0].rows});
    })
}