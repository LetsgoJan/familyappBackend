var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Family = require('../model/family.model').Family;
var session = require('../neo4j');

routes.post('/family', function (req, res, next) {

    res.contentType('application/json');
    const familyProps = req.body;

    session
        .run("CREATE(n:Family {name:{name}}) RETURN n.name",{
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

    session
        .run("MATCH(n:Family) RETURN n.name")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error)
        });

    // Family.find()
    //     .then ((result) => {
    //         res.send(result);
    //     })
    //     .catch(next);
});

routes.get('/family/:name', function (req, res, next) {
    res.contentType('application/json');
    const familyName = req.params.name;

    session
        .run("MATCH(n:Family {name:{familyName}}) RETURN n.name",{
            "familyName" : familyName
        })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error)
        });
    // Family.findOne({_id : familyId})
    //     .then ((result) => {
    //         res.send(result);
    //     })
    //     .catch(next);
});

routes.put('/family/:name', function (req, res, next) {
    res.contentType('application/json');
    const familyProps = req.body;
    const familyOldName = req.params.name;

    session
        .run("MATCH(n:Family {name:{familyOldName}}) SET n.name = {familyNewName} RETURN n.name",{
            "familyOldName" : familyOldName,
            "familyNewName" : familyProps.name
        })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error)
        }, next);
    // Family.findByIdAndUpdate({_id : familyId}, familyProps)
    //     .then(() => Family.findById({_id : familyId}))
    //     .then((family) => res.send(family))
    //     .catch(next);
});

routes.delete('/family/:name', function (req, res, next) {
    res.contentType('application/json');
    const familyName = req.params.name;

    session
        .run("MATCH(n:Family {name:{familyName}}) DELETE n RETURN n",{
            "familyName" : familyName
        })
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error)
        }, next);
    // Family.findByIdAndRemove({_id : familyId})
    //     .then(res.send({'item deleted': String}))
    //     .catch(next);
});

module.exports = routes;
