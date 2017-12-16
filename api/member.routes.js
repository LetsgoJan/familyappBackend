var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Member = require('../model/member.model').Member;
var session = require('../neo4j');


routes.post('/member', function (req, res, next) {
  res.contentType('application/json');
  const member = req.body;


  Member.create(member)
    .then(member => res.send(member))
    .catch(next);
});

routes.get('/member', function (req, res, next) {
  res.contentType('application/json');

  Member.find()
    .then ((result) => {
    res.send(result);
})
.catch(next);
});

routes.get('/member/:id', function (req, res, next) {
  res.contentType('application/json');
  const memberId = req.params.id;

  Member.findOne({_id : memberId})
    .then ((result) => {
    res.send(result);
})
.catch(next);
});

routes.put('/member/:id', function (req, res, next) {
  res.contentType('application/json');
  const memberProps = req.body;
  const memberId = req.params.id;

  Member.findByIdAndUpdate({_id : memberId}, memberProps)
    .then(() => Member.findById({_id : memberId}))
.then((member) => res.send(member))
.catch(next);
});

routes.delete('/member/:id', function (req, res, next) {
  res.contentType('application/json');
  const memberId = req.params.id;

  Member.findByIdAndRemove({_id : memberId})
    .then(res.send({'item deleted': String}))
    .catch(next);
});

module.exports = routes;
