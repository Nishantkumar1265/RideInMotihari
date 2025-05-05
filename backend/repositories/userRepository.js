// repositories/userRepository.js
const User = require('../models/user/user');

const createUser = async (userData) => {
    return await User.create(userData);
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const getUserById = async (user_id) => {
    return await User.findByPk(user_id);
};

const updateUser = async (user_id, updateData) => {
    await User.update(updateData, { where: { user_id } });
    return getUserById(user_id);
};

const deleteUser = async (user_id) => {
    return await User.destroy({ where: { user_id } });
};

const getAllUsers = async () => {
    return await User.findAll();
};

const changePassword = async (user_id, newPassword) => {
    const user = await userRepository.getUserById(user_id);
    if (!user) {
        throw new Error('User not found');
    }

    user.password = newPassword; // 👈 plain text, let hook hash it
    await user.save(); // will trigger beforeUpdate and hash the password
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    changePassword,
};
