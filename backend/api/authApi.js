// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authServices = require('../services/authServices');

// Logout route
router.post('/logout', authServices.logout);

module.exports = router;
