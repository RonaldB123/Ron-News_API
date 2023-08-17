const db = require("../../db/connection");
const format = require("pg-format");

exports.addComment = (article_id, body) =>{

    if(!body.hasOwnProperty("username") || !body.hasOwnProperty("body") || Object.keys(body).length !== 2){
            return Promise.reject({
                status: 404,
                message: "Not Found"
            })
    }
        const commentsQuery = format(`INSERT INTO comments (body, article_id, author, votes)
        VALUES %L RETURNING *`, [[body.body, Number(article_id), body.username, 0]]);
        return db.query(commentsQuery).then(({rows})=>{
            return rows[0];
        })
}