const db = require("../../db/connection");
const format = require("pg-format");

exports.patchArticleById = (article_id, body) =>{
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]).then(({rows})=>{
        return rows;
    }).then((article)=>{
        //article.votes += body.inc_votes;
    })
}