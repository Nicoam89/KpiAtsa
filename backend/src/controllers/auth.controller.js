import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ======================
   REGISTER
====================== */
export const register = async (req, res) => {
  try {
    const { dni, email, password } = req.body;

    const user = await User.create({ dni, email, password });

    res.json({ message: "Usuario creado", id: user._id });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/* ======================
   LOGIN
====================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Usuario no existe" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Password incorrecto" });

    /* 🔐 generar JWT */
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

