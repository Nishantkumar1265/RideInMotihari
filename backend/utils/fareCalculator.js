// backend/utils/fareCalculator.js

/**
 * Calculates the fare based on distance and provider rates
 * @param {number} distance - Distance in kilometers
 * @param {number} baseFare - Base fare amount
 * @param {number} perKmRate - Rate per kilometer
 * @param {number} [surgeMultiplier=1] - Surge pricing multiplier (default: 1)
 * @returns {number} Calculated fare
 */
const calculateFare = (distance, baseFare, perKmRate, surgeMultiplier = 1) => {
    // Validate inputs
    if (isNaN(distance)) throw new Error('Distance must be a number');
    if (isNaN(baseFare)) throw new Error('Base fare must be a number');
    if (isNaN(perKmRate)) throw new Error('Per km rate must be a number');
    if (distance < 0) throw new Error('Distance cannot be negative');
    
    // Calculate basic fare
    let fare = baseFare + (distance * perKmRate);
    
    // Apply surge pricing if needed
    fare *= surgeMultiplier;
    
    // Round to 2 decimal places
    return Math.round(fare * 100) / 100;
};

/**
 * Estimates distance between two coordinates (Haversine formula)
 * @param {object} origin - { lat, lng }
 * @param {object} destination - { lat, lng }
 * @returns {number} Distance in kilometers
 */
const estimateDistance = (origin, destination) => {
    // Validate coordinates
    if (!origin || !destination) throw new Error('Origin and destination coordinates are required');
    if (isNaN(origin.lat) || isNaN(origin.lng)) throw new Error('Invalid origin coordinates');
    if (isNaN(destination.lat) || isNaN(destination.lng)) throw new Error('Invalid destination coordinates');
    
    const R = 6371; // Earth radius in km
    const dLat = toRad(destination.lat - origin.lat);
    const dLon = toRad(destination.lng - origin.lng);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Helper function to convert degrees to radians
const toRad = (value) => {
    if (isNaN(value)) throw new Error('Invalid value for radians conversion');
    return value * Math.PI / 180;
};

module.exports = {
    calculateFare,
    estimateDistance
};