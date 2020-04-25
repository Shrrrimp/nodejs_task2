const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: { type: String, unique: true },
    // login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function encryptPassword(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
