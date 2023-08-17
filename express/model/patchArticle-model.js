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
        const {votes} = newArticle;
        const newVotes = votes + bodyVotes.inc_votes;
        
        return db.query(`UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`, [newVotes, articleId]);
    }).then(({rows})=>{
        return rows[0];
    })
    
}