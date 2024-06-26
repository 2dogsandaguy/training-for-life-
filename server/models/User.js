const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Weight.js
/* const Weight = require('./Weight'); */

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Journal',
    }
  ],
  bills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bill',
    },
  ],
  investments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Investment',
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
//   ,
//   weightRoutines: [{type: mongoose.Schema.Types.ObjectId,ref:'Weight'}],
//   cardioRoutines: [{type: mongoose.Schema.Types.ObjectId,ref:'Cardio'}],
//   setGoals: [{type: mongoose.Schema.Types.ObjectId,ref:'Goals'}]
// },
// {
//   toJSON: {
//     virtuals: true,
//   },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);


module.exports = User;

