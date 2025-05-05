const ServiceType = require('../models/servicetype/serviceType');

// Create a new service type
const createServiceType = async (data) => {
  return await ServiceType.create(data);
};

// Get all service types for a provider
const getServiceTypesByProviderId = async (providerId) => {
  return await ServiceType.findAll({ where: { provider_id: providerId } });
};

// Update a service type
const updateServiceType = async (id, data) => {
  return await ServiceType.update(data, { where: { service_type_id: id } });
};

// Delete a service type
const deleteServiceType = async (id) => {
  return await ServiceType.destroy({ where: { service_type_id: id } });
};

const getDistinctServiceTypesByProvider = async (providerId) => {
  const types = await ServiceType.findAll({
    attributes: ['service_type'],
    where: { provider_id: providerId },
    group: ['service_type']
  });
  return types.map(t => t.service_type); // return just the values
};

module.exports = {
  createServiceType,
  getServiceTypesByProviderId,
  updateServiceType,
  deleteServiceType,
  getDistinctServiceTypesByProvider,
};
