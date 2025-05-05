const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Config/db');

// Routes
const userRoutes = require('./api/userApi');
const serviceProviderRoutes = require('./api/serviceProviderApi');
const bookingRoutes = require('./api/bookingApi');
const serviceTypeRoutes = require('./api/serviceTypeApi');
const Auth = require("./models/authModel/authModels.js")
const authRoutes = require('./api/authApi.js');

// Middleware
app.use(express.json());
app.use(cors());

// Route prefixing
app.use('/api/users', userRoutes);
app.use('/api/service-providers', serviceProviderRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/auth', authRoutes);


// Database connection and server start
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced');
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
