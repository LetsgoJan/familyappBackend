var express = require('express');
var routes = express.Router();
var session = require('../neo4j');

routes.post('/familyMember', function (req, res, next) {
    res.contentType('application/json');

    session
        .run("CREATE(n:Member {_id:{id}}) RETURN n",{
            "id":req.body.id
        })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (error) {
            console.log(error)
        },next);
});

routes.delete('/familyMember:id', function (req, res, next) {
    res.contentType('application/json');

    session
        .run("MATCH(a:Member {_id:{id}})-[c]-(b) DELETE a,b,c RETURN a",{
            "id":req.params.id
        })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (error) {
            console.log(error)
        },next);
});

routes.post('/familyMemberRel', function (req, res, next) {
    res.contentType('application/json');

    session
        .run("MATCH(a:Family {name:{familyName}}),(b:Member {_id:{id}}) MERGE (a)-[c:IsA]->(b) RETURN a,b,c",{
            "id":req.body.id,
            "familyName":req.body.familyName
        })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (error) {
            console.log(error)
        },next);
});

routes.get('/familyMemberRel/:id', function (req, res, next) {
    res.contentType('application/json');

    session
        .run("MATCH (a:Member {_id:{id}})-[c:IsA]-(b) RETURN b",{
            "id":req.params.id
        })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (error) {
            console.log(error)
        },next);
});


routes.delete('/familyMemberRel:id:familyName', function (req, res, next) {
    res.contentType('application/json');

    session
        .run("MATCH (a:Member {id:{id}})-[c:IsA]-(b:Family {name:{familyName}}) DELETE c RETURN a.id,b.name,c",{
            "id":req.params.id,
            "familyName":req.params.familyName
        })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (error) {
            console.log(error)
        },next);
});

module.exports = routes;
