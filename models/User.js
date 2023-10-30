const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SALT_WORK_FACTOR = 10;

const User = new Schema({
  id: ObjectId,
  username: String,
  password: String,
  location: {
    lat: Number,
    long: Number,
  },
});

User.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", User);
