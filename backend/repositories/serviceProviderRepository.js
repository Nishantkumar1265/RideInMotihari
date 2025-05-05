const ServiceProvider = require('../models/service_provider/serviceProvider');

const createProvider = async (data) => await ServiceProvider.create(data);
const findByEmail = async (email) => await ServiceProvider.findOne({ where: { email } });
const findById = async (id) => await ServiceProvider.findByPk(id);

// ✅ NEW: Get all service providers
const findAllProviders = async () => await ServiceProvider.findAll();

// ✅ NEW: Update a service provider (e.g., status)
const updateProvider = async (data, options) => await ServiceProvider.update(data, options);

const getApprovedProviders = async () => {
    try {
        return await ServiceProvider.findAll({
            where: {
                status: 'approved',
            },
            attributes: ['provider_id', 'name', 'email', 'location', 'status', 'registered_at'],
        });
    } catch (err) {
        throw new Error('Error fetching approved service providers: ' + err.message);
    }
};

module.exports = {
    createProvider,
    findByEmail,
    findById,
    findAllProviders,   // ✅ Now available to service layer
    updateProvider,      // ✅ Used in PATCH endpoint
    getApprovedProviders,
};
