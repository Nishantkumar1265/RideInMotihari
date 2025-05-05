// controllers/auth.controller.js
const Auth = require('../models/authModel/authModels');

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }

    const deleted = await Auth.destroy({ where: { token } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Session not found or already logged out' });
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { logout };
