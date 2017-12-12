var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Family = require('../model/family.model').Family;
var session = require('../server').session;

routes.post('/family', function (req, res, next) {

    res.contentType('application/json');
    const familyProps = req.body;

    session
        .run("CREATE(n:Family {name:{name}) RETURN n.name",{
            "name":req.body.name
        })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error)

        });

    // res.contentType('application/json');
    // const familyProps = req.body;
    //
    // Family.create(familyProps)
    //     .then(family => res.send(family))
    //     .catch(next);
});

routes.get('/family', function (req, res, next) {
    res.contentType('application/json');

    Family.find()
        .then ((result) => {
            res.send(result);
        })
        .catch(next);
});

routes.get('/family/:id', function (req, res, next) {
    res.contentType('application/json');
    const familyId = req.params.id;

    Family.findOne({_id : familyId})
        .then ((result) => {
            res.send(result);
        })
        .catch(next);
});

routes.put('/family/:id', function (req, res, next) {
    res.contentType('application/json');
    const familyProps = req.body;
    const familyId = req.params.id;

    Family.findByIdAndUpdate({_id : familyId}, familyProps)
        .then(() => Family.findById({_id : familyId}))
        .then((family) => res.send(family))
        .catch(next);
});

routes.delete('/family/:id', function (req, res, next) {
    res.contentType('application/json');
    const familyId = req.params.id;

    Family.findByIdAndRemove({_id : familyId})
        .then(res.send({'item deleted': String}))
        .catch(next);
});

module.exports = routes;
