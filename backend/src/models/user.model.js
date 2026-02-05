import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  passwordChangedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });


// middleware

import bcrypt from "bcryptjs";

userSchema.pre("save", async function(next) {

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  this.passwordChangedAt = new Date();

  next();
});


export default mongoose.model("User", userSchema);

