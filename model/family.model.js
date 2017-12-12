const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const memberSchema = require('./member.model').MemberSchema;

const familySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    members: {
        type: [memberSchema],
        required: true
    }
});

const Family = mongoose.model('family', familySchema);

module.exports = {
    Family: Family,
    familySchema: familySchema
};
