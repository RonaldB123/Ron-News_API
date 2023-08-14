const db = require("../../db/connection");

exports.articleData = () =>{  
    return db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at ASC`).then(({rows}) =>{
        const removedBodyArticle = rows.map(article =>{
            const {body, ...newArticle} = article;

            newArticle.comment_count = Number(newArticle.comment_count)
            
            return newArticle;
        })
        return removedBodyArticle;       
    })      
}

