const db = require("../../db/connection");

exports.getCommentsData = (id) =>{
    return db.query(`SELECT * FROM comments 
    WHERE article_id = $1
    ORDER BY created_at ASC`, [id]).then(({rows})=>{
        if(!rows.length){
            return Promise.reject({
                status: 404,
                message: "Not Found"
            })
        }
        return rows;
    })
}