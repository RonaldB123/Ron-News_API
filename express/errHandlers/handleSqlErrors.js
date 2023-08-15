
exports.handleSqlErrors = (err, req, res, next) =>{
    if(err.code === '22P02'){
        res.status(400).send({message: "Bad Request"});
    }else{
        next(err);
    }
}