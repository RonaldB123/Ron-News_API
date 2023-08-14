const {endpointData} = require("../model/api-model");

exports.getEndpoints = (req, res) =>{
    res.status(200).send({endpoints: JSON.stringify(endpointData())});
}