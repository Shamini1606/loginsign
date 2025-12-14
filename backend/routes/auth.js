const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Signup
router.post("/signup", async (req, res) => {
const { name, email, password } = req.body;
const hashed = await bcrypt.hash(password, 10);


try {
const user = new User({ name, email, password: hashed });
await user.save();
res.json({ message: "User Registered" });
} catch {
res.status(400).json({ error: "Email already exists" });
}
});


// Login
router.post("/login", async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });


if (!user) return res.status(400).json({ error: "User not found" });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ error: "Invalid password" });


res.json({ message: "Login successful", user });
});


module.exports = router;