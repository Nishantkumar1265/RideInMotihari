const express = require('express');
const router = express.Router();
const serviceProviderService = require('../services/serviceProviderService');

// Home route (optional)
router.get('/', (req, res) => {
    res.send("Service Provider API is running 🚚");
});

// Register a new service provider
router.post('/register', async (req, res) => {
    try {
        const providerData = req.body;

        const newProvider = await serviceProviderService.registerProvider(providerData);
        res.status(201).json({ message: 'Service Provider registered successfully', provider: newProvider });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const provider = await serviceProviderService.loginProvider(email, password);

        // ✅ Optional: generate JWT token here and send with response
        res.status(200).json({ message: 'Login successful', provider });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

// GET all providers
router.get('/providers', async (req, res) => {
    try {
      const providers = await serviceProviderService.findAll();
      res.json(providers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // PATCH provider status
router.patch('/providers/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
  
      const updated = await serviceProviderService.update({ status }, { where: { provider_id: id } });
      if (updated[0] === 0) {
        return res.status(404).json({ message: 'Provider not found' });
      }
  
      res.json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET provider by ID
router.get('/providers/:id', async (req, res) => {
  try {
    const provider = await serviceProviderService.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all approved service providers (updated for approval filter)
router.get('/approvedproviders', async (req, res) => {
  try {
      const providers = await serviceProviderService.getApprovedProviders(); // Fetch approved only
      if (providers.length === 0) {
          return res.status(404).json({ message: 'No approved service providers found' });
      }
      res.json(providers);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
