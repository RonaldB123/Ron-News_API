const db = require("../../db/connection");

exports.usersData = () =>{
    return db.query("SELECT * FROM users").then(({rows})=>{
        return rows;
    })
}