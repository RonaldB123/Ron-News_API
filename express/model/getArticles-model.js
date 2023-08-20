const db = require("../../db/connection");

exports.articleData = (query) =>{  
    const allowedQueries = ["topic", "sort_by", "order"];

        if(!allowedQueries.includes(Object.keys(query)[0]) && Object.keys(query).length > 0){
            return Promise.reject({
                status: 400,
                message: "Bad Request"
            })
        }

    
    let baseStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id`;

    if(Object.keys(query).length === 1 && Object.keys(query)[0] === "topic"){
        baseStr += ` WHERE topic = '${query["topic"]}'`;
    }

    baseStr+= " GROUP BY articles.article_id";
    
    if(Object.keys(query).length === 1 && Object.keys(query)[0] === "sort_by"){
        baseStr+= ` ORDER BY ${query["sort_by"]}`;
    }else{
        baseStr+= ' ORDER BY created_at';
    }
    
    if(Object.keys(query).length === 1 && Object.keys(query)[0] === "order"){
        baseStr+= ` ${query["order"]}`;
    }else{
        baseStr+= ` DESC`;
    }
    
    return db.query(baseStr).then(({rows}) =>{
        return rows;
    })      
}

// `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count
//     FROM articles
//     LEFT JOIN comments ON comments.article_id = articles.article_id
//     WHERE topic = 'mitch'
//     GROUP BY articles.article_id
//     ORDER BY created_at DESC
//     `
