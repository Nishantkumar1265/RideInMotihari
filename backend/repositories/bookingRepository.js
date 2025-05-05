const Booking = require('../models/bookings/bookings');

const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

const getBookingById = async (id) => {
    return await Booking.findByPk(id);
};

const getAllBookings = async () => {
    return await Booking.findAll();
};

const getBookingsByUserId = async (userId) => {
    return await Booking.findAll({ where: { user_id: userId } });
};

const getBookingsByProviderId = async (providerId) => {
    return await Booking.findAll({ where: { provider_id: providerId } });
};

const updateBookingStatus = async (bookingId, status) => {
    return await Booking.update(
        { status },
        { where: { booking_id: bookingId } }
    );
};

const deleteBooking = async (id) => {
    return await Booking.destroy({ where: { booking_id: id } });
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    getBookingsByUserId,
    getBookingsByProviderId,
    updateBookingStatus,
    deleteBooking
};
