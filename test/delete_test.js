const assert = require('assert');
const Member = require('../model/member.model').Member;

describe('Deleting a member', () => {
  let joe;

  beforeEach((done) => {
    joe = new Member({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(()=>Member.findOne({name:'Joe'}))
      .then((member) => {
        assert(member === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    Member.findByIdAndRemove({_id:joe._id})
      .then(()=>Member.findOne({name:'Joe'}))
      .then((member) => {
        assert(member === null);
        done();
      });
  });
});
