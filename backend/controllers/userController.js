import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });

export const register = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, profileImage });
    const token = genToken(user._id);
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = genToken(user._id);
    res.json({ user, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
