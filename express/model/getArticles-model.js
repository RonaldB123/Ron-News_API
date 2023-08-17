const db = require("../../db/connection");

exports.articleData = (query) =>{  
    const allowedQueries = ["topic"];

    if(!allowedQueries.includes(query) && query){
        return Promise.reject({
            status: 404,
            message: "Not Found"
        })
    }

    // let baseStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
    // FROM articles
    // LEFT JOIN comments ON comments.article_id = articles.article_id
    // GROUP BY articles.article_id`

    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE topic = 'mitch'
    GROUP BY articles.article_id
    ORDER BY created_at DESC
    `).then(({rows}) =>{
        console.log(rows)
        return rows;
    })      
}

