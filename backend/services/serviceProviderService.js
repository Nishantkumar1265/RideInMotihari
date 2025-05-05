const serviceProviderRepo = require('../repositories/serviceProviderRepository');
const { comparePassword } = require('../utils/password');
const Auth = require('../models/authModel/authModels');
const jwt = require('jsonwebtoken');

// Register new service provider
const registerProvider = async (providerData) => {
    try {
        // Check if email already exists
        const existing = await serviceProviderRepo.findByEmail(providerData.email);
        if (existing) {
            throw new Error('Email already registered');
        }

        // Create new provider
        const newProvider = await serviceProviderRepo.createProvider(providerData);
        return newProvider; // Return the newly created provider
    } catch (error) {
        console.error("Error during provider registration:", error);
        throw error; // Rethrow to handle in the route
    }
};

// Login service provider
const loginProvider = async (email, password) => {
    try {
        // Find provider by email
        const provider = await serviceProviderRepo.findByEmail(email);
        if (!provider) {
            throw new Error('Email not found');
        }

        // Compare password with stored hashed password
        const isMatch = await comparePassword(password, provider.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token for authenticated service provider
        const token = jwt.sign(
            { id: provider.provider_id, role: 'service_provider' }, // Payload
            'SECRET_KEY', // Secret key from environment variable
            { expiresIn: '1h' } // Token expiration time
        );

        // Save the generated token to the Auth table
        await Auth.create({
            user_id: null, // No user_id because this is a service provider login
            provider_id: provider.provider_id,
            token,
        });

        // Return token and provider info
        return {
            token,
            role: 'service_provider',
            provider_id: provider.provider_id,
        };
    } catch (error) {
        console.error("Error during provider login:", error);
        throw error; // Rethrow to handle in the route
    }
};

// ✅ NEW: Get all providers
const findAll = async () => {
    try {
        const providers = await serviceProviderRepo.findAllProviders();
        return providers;
    } catch (error) {
        console.error("Error fetching providers:", error);
        throw error;
    }
};

// ✅ Optional: Update provider status
const update = async (data, options) => {
    try {
        const updated = await serviceProviderRepo.updateProvider(data, options);
        return updated;
    } catch (error) {
        console.error("Error updating provider:", error);
        throw error;
    }
};

const findById = async (id) => {
    return await serviceProviderRepo.findById(id);
  };

  const getApprovedProviders = async () => {
    try {
        const providers = await serviceProviderRepo.getApprovedProviders();
        return providers;
    } catch (err) {
        throw new Error('Error in service layer: ' + err.message);
    }
};

module.exports = {
    registerProvider,
    loginProvider,
    findAll,        // ✅ Expose the new function
    update,
    findById,         // ✅ Expose update method
    getApprovedProviders,
};