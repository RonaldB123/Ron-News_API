const db = require("../../db/connection");
const format = require("pg-format");

exports.patchArticleById = (articleId, bodyVotes) =>{
    if(!bodyVotes.hasOwnProperty("inc_votes") || Object.keys(bodyVotes).length !== 1 || isNaN(bodyVotes.inc_votes)){
        return Promise.reject({
            status: 404,
            message: "Not Found"
        })
    }

    return db.query("SELECT * FROM articles WHERE article_id = $1", [articleId]).then(({rows})=>{
        return rows;
    }).then((article)=>{
        const newArticle = article[0]; 

        const {article_id, title, topic, author, body, created_at, votes, article_img_url} = newArticle
        const newVotes = votes + bodyVotes.inc_votes;
        
        return {article_id, title, topic, author, body, created_at, votes: newVotes, article_img_url};
    })
}