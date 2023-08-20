
exports.handleSqlErrors = (err, req, res, next) =>{
    if(err.code === '22P02'){
        res.status(400).send({message: "Bad Request"});
    }else if(err.code === '42601' || err.code === '42703'){
        res.status(404).send({message: "Not Found"})
    }else{
        next(err);
    }
}