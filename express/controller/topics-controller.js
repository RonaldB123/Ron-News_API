const {topicsData} = require("../model/topics-model");

exports.getTopics = (req, res) =>{
    topicsData().then((topics) =>{
        res.status(200).send({topics});
    })
}