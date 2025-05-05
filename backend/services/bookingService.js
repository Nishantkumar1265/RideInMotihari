const bookingRepository = require('../repositories/bookingRepository');

const createBooking = async (bookingData) => {
    const {
        user_id,
        provider_id,
        service_type,
        pickup_location,
        drop_location,
        distance
    } = bookingData;

    if (!user_id || !provider_id || !service_type || !pickup_location || !drop_location || !distance) {
        throw new Error("All fields are required to create a booking");
    }

    let fixedCharge = 0;
    let perKmRate = 0;

    switch (service_type) {
        case 'bike':
            fixedCharge = 50;
            perKmRate = 8;
            break;
        case 'auto':
            fixedCharge = 80;
            perKmRate = 12;
            break;
        case 'car (4-seater)':
            fixedCharge = 150;
            perKmRate = 18;
            break;
        default:
            throw new Error("Invalid service type");
    }

    const cost = fixedCharge + (perKmRate * distance);

    return await bookingRepository.createBooking({
        user_id,
        provider_id,
        service_type,
        pickup_location,
        drop_location,
        distance,
        cost,
        status: 'pending'
    });
};

const getBookingById = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error("Booking not found");
    }
    return booking;
};

const getAllBookings = async () => {
    return await bookingRepository.getAllBookings();
};

const getUserBookings = async (userId) => {
    return await bookingRepository.getBookingsByUserId(userId);
};

const getProviderBookings = async (providerId) => {
    return await bookingRepository.getBookingsByProviderId(providerId);
};

const updateStatus = async (bookingId, newStatus) => {
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error("Invalid status");
    }
    return await bookingRepository.updateBookingStatus(bookingId, newStatus);
};

const deleteBooking = async (id) => {
    return await bookingRepository.deleteBooking(id);
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    getUserBookings,
    getProviderBookings,
    updateStatus,
    deleteBooking
};
