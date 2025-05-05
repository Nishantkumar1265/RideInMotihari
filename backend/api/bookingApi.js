const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');

// Create a booking
router.post('/', async (req, res) => {
    try {
        const newBooking = await bookingService.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        res.json(booking);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get bookings by user
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await bookingService.getUserBookings(req.params.userId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bookings by provider
router.get('/provider/:providerId', async (req, res) => {
    try {
        const bookings = await bookingService.getProviderBookings(req.params.providerId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update status
router.put('/:id/status', async (req, res) => {
    try {
        const updated = await bookingService.updateStatus(req.params.id, req.body.status);
        res.json({ message: 'Status updated successfully', updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete booking
router.delete('/:id', async (req, res) => {
    try {
        await bookingService.deleteBooking(req.params.id);
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
