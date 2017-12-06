const assert = require('assert');
const Member = require( '../model/member.model').Member;

describe('Reading useres out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new Member({name:'Joe'});
    joe.save()
      .then(() => done());
  });

  it('finds all members with a name of joe', (done) => {
    Member.find({name:'Joe'})
      .then((member) => {
        assert(member[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find joe by id', (done) => {
    Member.findOne({_id: joe._id})
      .then((member) => {
        assert(member.name === 'Joe');
        done();
      });
  });

  it('find joe by id', (done) => {
    Member.find({_id: joe._id})
      .then((member) => {
        assert(member.name === 'Joe');
        done();
      });
  });
});
