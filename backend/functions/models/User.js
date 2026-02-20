import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  passwordUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;