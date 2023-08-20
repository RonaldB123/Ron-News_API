const db = require("../../db/connection");

exports.articleData = (id) =>{
    return db.query(`SELECT articles.author, articles.body, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE comments.article_id = $1
    GROUP BY articles.article_id
    `, [id]).then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({
                status: 404,
                message: "Not Found"
            })
        }       
        return rows[0];
    })
}
