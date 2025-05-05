const express = require('express');
const router = express.Router();
const serviceTypeService = require('../services/serviceTypeService');

// Add a new service type
router.post('/', async (req, res) => {
  try {
    const { provider_id, service_type, company_name, model_name } = req.body;
    const newServiceType = await serviceTypeService.addServiceType(provider_id, service_type, company_name, model_name);
    res.status(201).json(newServiceType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all service types for a provider
router.get('/:providerId', async (req, res) => {
  try {
    const types = await serviceTypeService.listServiceTypes(req.params.providerId);
    res.status(200).json(types);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a service type
router.put('/:id', async (req, res) => {
  try {
    const { service_type, company_name, model_name } = req.body;
    const updated = await serviceTypeService.updateServiceType(req.params.id, { service_type, company_name, model_name });
    res.status(200).json({ message: 'Updated successfully', updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service type
router.delete('/:id', async (req, res) => {
  try {
    await serviceTypeService.deleteServiceType(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/providers/:providerId', async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const types = await serviceTypeService.listDistinctServiceTypes(providerId);
    res.status(200).json(types); // array like ["bike", "car (4-seater)"]
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
