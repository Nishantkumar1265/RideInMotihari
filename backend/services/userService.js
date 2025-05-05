const userRepository = require('../repositories/userRepository');
const { comparePassword } = require('../utils/password');
const isStrongPassword = require('../utils/validatePassword');
const Auth = require('../models/authModel/authModels')
const jwt = require('jsonwebtoken')
const { hashPassword } = require('../utils/password');


const registerUser = async (userData) => {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    if (!isStrongPassword(userData.password)) {
        throw new Error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, at least two digits, and one special character.');
    }

    return await userRepository.createUser(userData);
};

const loginUser = async (email, password) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.user_id, role: user.role },
        'SECRET_KEY',
        // process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    await Auth.create({
        user_id: user.user_id,
        provider_id: null, 
        token,
    });
    return { token,
        role: user.role,
        user_id: user.user_id, };


    // return user;
};


const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const deleteUserById = async (user_id) => {
    return await userRepository.deleteUser(user_id);
};

// ✅ Get user by ID
const getUserById = async (user_id) => {
    const user = await userRepository.getUserById(user_id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};


const changePassword = async (user_id, newPassword) => {
    const user = await userRepository.getUserById(user_id);
    if (!user) {
        throw new Error('User not found');
    }

    if (!isStrongPassword(newPassword)) {
        throw new Error('New password is not strong enough');
    }

    user.password = newPassword;
    await user.save(); // Will trigger the hook to hash password
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUserById,
    getUserById,
    changePassword,
};
