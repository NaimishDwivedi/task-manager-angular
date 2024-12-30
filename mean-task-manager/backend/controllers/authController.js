const User = require("../models/User");

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

exports.registerUser = async (req, res) => {
  console.log("API hit");
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({ name, email, password });

    await newUser.save();

    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error","Error":error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
