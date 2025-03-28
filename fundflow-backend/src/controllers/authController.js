const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    console.log(password)
    console.log(name)
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const userId = await User.create(name, email, password);
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        user.userId = user.id; // Assign id to userId
        delete user.id; // Optional: Remove original id field
        delete user.password;


        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2d" });
        console.log({ userId: user.id })
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
