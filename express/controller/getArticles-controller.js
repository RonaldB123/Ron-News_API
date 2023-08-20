const {articleData} = require("../model/getArticles-model");

exports.getArticles = (req, res, next) =>{

    articleData(req.query).then((articles) =>{
        res.status(200).send({articles});
    }).catch((err)=>{
        next(err);
    })
}