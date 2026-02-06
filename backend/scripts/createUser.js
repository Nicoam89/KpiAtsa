import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../src/models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashed = await bcrypt.hash("123456", 10);

await User.create({
  dni: "30111222",
  email: "nico@test.com",
  password: hashed,
  passwordUpdatedAt: new Date()
});

console.log("✅ Usuario creado");

process.exit();
