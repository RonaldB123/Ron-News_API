
exports.handleCustomErrors = (err, req, res, next) =>{
    if(err.status === 404){
        res.status(404).send({message: "Not Found"});
    }else if (err.status === 400){
        res.status(400).send({message: "Bad Request"});
    }else{
        next(err);
    }
}