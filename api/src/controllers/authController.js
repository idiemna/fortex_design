const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET || "secreto_super_seguro";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      SECRET_KEY
    );

    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "Inicio de sesión exitoso",
      user: { name: user.name, id: user.id, role: user.role },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
};

module.exports = { register, login, logout };
