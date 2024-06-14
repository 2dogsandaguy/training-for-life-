const { Schema, model} = require('mongoose');
 const dateFormat = require('../utils/dateFormat');
// const bcrypt = require('bcrypt');
//const { default: Journal } = require('../../client/src/components/Journal');


const journalSchema = new Schema({
  journal: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    //get: (timestamp) => dateFormat(timestamp),
  },
});

 const JournalModels = model('Journal', journalSchema);

module.exports = JournalModels;
