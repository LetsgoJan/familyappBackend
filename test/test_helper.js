const mongoose = require('mongoose');
const Member = require('../model/member.model').Member;

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => {
        console.warn('Warning', error);
    });
});


beforeEach((done) => {
    Member.remove(() => {
        done();
    });
});
