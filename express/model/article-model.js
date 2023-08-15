const db = require("../../db/connection");


exports.articleData = (id) =>{

    if(!id || isNaN(id)){
        return Promise.reject({
            status: 404,
            message: "Not Found"
        })
    }

    return db.query(`SELECT * FROM articles WHERE article_id = ${id}`).then(({rows}) =>{
        if(rows.length === 0){
            return Promise.reject({
                status: 400,
                message: "Bad Request"
            })
        }
        return rows[0];
    })
}