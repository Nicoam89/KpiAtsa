const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
  try {
    const { dni, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      dni,
      email,
      password: hash
    });

    res.json({ message: "Usuario creado" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
  try {
    const { dni, email, password } = req.body;

    const user = await User.findOne({ dni, email });

    if (!user)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// CHANGE PASSWORD
// ==========================
const changePassword = async (req, res) => {
  try {
    const { dni, email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ dni, email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordUpdatedAt = new Date();

    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  register,
  login,
  changePassword
};
