const db = require("../../db/connection");
const format = require("pg-format");

exports.addComment = (article_id, body) =>{

    const usersQuery = format(`INSERT INTO users (username, name, avatar_url)
    VALUES %L`, [[body.username, body.username, '']]);
    const usersPromise = db.query(usersQuery);

    return Promise.all([usersPromise]).then(() =>{
        const commentsQuery = format(`INSERT INTO comments (body, article_id, author, votes, created_at)
        VALUES %L RETURNING *`, [[body.body, Number(article_id), body.username, 0, new Date()]]);
        const commentsPromise = db.query(commentsQuery);

        return Promise.all([commentsPromise]);
    })
}