const User = require('../models/user.model');

class UserDAO {
    // Create a new user
    async createUser(userData) {
        return await User.create(userData);
    }

    // Find a user by ID
    async findUserById(userId) {
        return await User.findById(userId).select('-password');
    }

    // Find a user by email
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    // Update user by ID
    async updateUserById(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    }

    // Delete user by ID
    async deleteUserById(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserDAO();
