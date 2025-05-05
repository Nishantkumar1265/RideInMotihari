const serviceTypeRepository = require('../repositories/serviceTypeRepository');

// Add a new service type
const addServiceType = async (providerId, service_type, company_name, model_name) => {
  return await serviceTypeRepository.createServiceType({ provider_id: providerId, service_type, company_name, model_name });
};

// List all service types for a provider
const listServiceTypes = async (providerId) => {
  return await serviceTypeRepository.getServiceTypesByProviderId(providerId);
};

// Update a service type
const updateServiceType = async (id, data) => {
  return await serviceTypeRepository.updateServiceType(id, data);
};

// Delete a service type
const deleteServiceType = async (id) => {
  return await serviceTypeRepository.deleteServiceType(id);
};

// List distinct service types for a provider
const listDistinctServiceTypes = async (providerId) => {
  return await serviceTypeRepository.getDistinctServiceTypesByProvider(providerId);
};

module.exports = {
  addServiceType,
  listServiceTypes,
  updateServiceType,
  deleteServiceType,
  listDistinctServiceTypes,
};
