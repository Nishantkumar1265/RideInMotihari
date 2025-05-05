// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Home route (optional)
router.get('/', (req, res) => {
    res.send("API is running 🚀");
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        const newUser = await userService.registerUser(userData);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userService.loginUser(email, password);

        // ✅ Optional: generate JWT token here and send with response
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Change password
router.put('/:id/change-password', async (req, res) => {
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        await userService.changePassword(userId, newPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await userService.deleteUserById(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
