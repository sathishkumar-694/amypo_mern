const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());

//db connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Mongodb connection failed", error.message);
    process.exit(1);
  }
};
connectDb();

//model
const User = mongoose.model("User", {
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

//jwt generation
const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role }, //payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
  );
  return token;
};

//verify jwt token
const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    return res.status(401).json({ message: "no token found" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = decoded;//login user data request

    next();

  } catch (error) {
    return res.status(401).json({message:"token expired or invalid"})
  }
};

//admin verification
const isAdmin = async(req,res,next)=>
{
  if(req.user.role !=="admin")
  {
    return res.status(403).json({message:"admin only"})//forbidden-403
  }
  next();
}

//function block ends
//=========================================================

//routing starts

//POST for registering
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //checking if exists or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    //create user in db
    await User.create({
      name: name,
      email: email,
      password: hash,
      role: role || "User",
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//login check
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const exists = await User.findOne({ email });
  if (!exists) {
    return res.status(400).json({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, exists.password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid username or password" });
  }
  const token = generateToken(exists);
  return res.status(200).json({
    message: "user logged in successfully",
    token: token,
    role: exists.role,
  });
});

//role -(user) verification
app.get("/profile", verifyToken, async (req, res) => 
  {
    return res.json({message :"User API-Access", user:req.user})
  }
);
//admin verification
app.get("/admin" , verifyToken , isAdmin , async(req, res)=>
{
    res.json({message:"Admin API-Access" , user:req.user})
})

app.listen(process.env.PORT, () => {
  console.log("server is running on PORT", process.env.PORT);
});
