const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helpers/error-handler');

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

userSchema.methods.generateAuthToken = async () => {
  const { id, login } = this;
  return jwt.sign({ id, login }, process.env.JWT_SECRET_KEY);
};

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new ErrorHandler(403, 'Invalid login');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ErrorHandler(403, 'Invalid password');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
