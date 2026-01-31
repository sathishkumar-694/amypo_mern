const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config(); // ✅ MUST be first

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
});

// User model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  googleId: String,
});

// REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPass,
  });

  res.json({ message: "Registration successful" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const passCheck = await bcrypt.compare(password, user.password);
  if (!passCheck) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  res.json({ token });
});

// GOOGLE LOGIN
app.post("/auth/google", async (req, res) => {
  const { token: idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "No Google token provided" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
        googleId,
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

// START SERVER
app.listen(port, () => {
  console.log("Server running on port", port);
});

