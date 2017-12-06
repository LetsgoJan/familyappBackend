const assert = require('assert');
const Member = require('../model/member.model').Member;

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new Member({name: 'joe'});

    joe.save()
      .then(() => {
        assert(!joe.isNew);
        done();
      });
  });
});
