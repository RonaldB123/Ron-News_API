
exports.handleCustomErrors = (err, req, res, next) =>{
    if(err.status === 404){
        res.status(404).send({message: "Not Found"});
    }else{
        next(err);
    }
}