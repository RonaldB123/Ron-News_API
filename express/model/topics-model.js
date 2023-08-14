const db = require("../../db/connection");

exports.topicsData = () =>{
    return db.query("SELECT * FROM topics").then(({rows}) =>{
        return rows;
    })
}