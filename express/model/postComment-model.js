const db = require("../../db/connection");
const format = require("pg-format");

exports.addComment = (article_id, body) =>{

    if(!body.hasOwnProperty("username") || !body.hasOwnProperty("body") || Object.keys(body).length !== 2){
            return Promise.reject({
                status: 404,
                message: "Not Found"
            })
    }

    const usersQuery = format(`INSERT INTO users (username, name, avatar_url)
    VALUES %L`, [[body.username, body.username, '']]);
    const usersPromise = db.query(usersQuery);

    return usersPromise.then(() =>{
        const commentsQuery = format(`INSERT INTO comments (body, article_id, author, votes, created_at)
        VALUES %L RETURNING *`, [[body.body, Number(article_id), body.username, 0, new Date()]]);
        const commentsPromise = db.query(commentsQuery);
    
        return commentsPromise;
    }).then(({rows}) =>{
        return rows[0];
    })
}