const {usersData} = require("../model/users-model");

exports.getAllUsers = (req, res, next) =>{
    usersData().then((users)=>{
        res.status(200).send({users});
    })
}