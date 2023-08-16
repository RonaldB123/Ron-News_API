const {deleteCommentByCommentId} = require("../model/deleteComment-model");

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params;
    deleteCommentByCommentId(comment_id).then(()=>{
        res.status(204).send();
    }).catch((err) =>{
        next(err);
    })
}