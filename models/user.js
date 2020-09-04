const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'please provide email id'],
    },
    name: {
      type: String,
      required: [true, 'please provide name'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'please provide password'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'please provide confirm password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'password and confirm password are not same',
      },
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const user = mongoose.model('User', UserSchema);
module.exports = user;
