const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  middleName: {
    type: String
  },

  lastName: {
    type: String,
    required: true
  },
});

const Member = mongoose.model('member', MemberSchema);

module.exports = {
  Member: Member,
  MemberSchema: MemberSchema
};
