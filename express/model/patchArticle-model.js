const db = require("../../db/connection");
const format = require("pg-format");

exports.patchArticleById = (articleId, bodyVotes) =>{
    const allowedKeys = ["inc_votes"]

    Object.keys(bodyVotes).forEach(key =>{
        if(!allowedKeys.includes(key)){
            return Promise.reject({
                status: 400,
                message: "Bad Request"
            })
        }
    })

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