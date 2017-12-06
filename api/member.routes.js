var express = require('express');
var routes = express.Router();
var Member = require('../model/member.model').Member;

routes.post('/member', function (req, res, next) {
  res.contentType('application/json');
  const ingredientProps = req.body;

  Member.create(ingredientProps)
    .then(ingredient => res.send(ingredient))
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
  const ingredientId = req.params.id;

  Member.findOne({_id : ingredientId})
    .then ((result) => {
    res.send(result);
})
.catch(next);
});

routes.put('/member/:id', function (req, res, next) {
  res.contentType('application/json');
  const ingredientProps = req.body;
  const ingredientId = req.params.id;

  Member.findByIdAndUpdate({_id : ingredientId}, ingredientProps)
    .then(() => Member.findById({_id : ingredientId}))
.then((ingredient) => res.send(ingredient))
.catch(next);
});

routes.delete('/member/:id', function (req, res, next) {
  res.contentType('application/json');
  const ingredientId = req.params.id;

  Member.findByIdAndRemove({_id : ingredientId})
    .then(res.send({msg:'item deleted'}))
    .catch(next);
});

module.exports = routes;
