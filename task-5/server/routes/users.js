const express = require('express');
const router = express.Router();
const { UserProfile } = require('../db');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserProfile.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a user
router.post('/', async (req, res) => {
    try {
        const { name, email, age, address } = req.body;
        const newUser = new UserProfile({ name, email, age, address });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
