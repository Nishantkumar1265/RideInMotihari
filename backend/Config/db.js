const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('../Config/db.js'); // Ensure this path is correct

// Routes
const userRoutes = require('../api/userApi');
const serviceProviderRoutes = require('../api/serviceProviderApi');
const bookingRoutes = require('../api/bookingApi');
const serviceTypeRoutes = require('../api/serviceTypeApi');
const Auth = require("../models/authModel/authModels.js");
const authRoutes = require('../api/authApi.js');

// Middleware
app.use(express.json());

// CORS configuration (allowing Vercel to make requests)
const allowedOrigins = ['https://your-vercel-app-url.vercel.app']; // Add your Vercel URL here
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from Vercel frontend or localhost for development
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Route prefixing
app.use('/api/users', userRoutes);
app.use('/api/service-providers', serviceProviderRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/auth', authRoutes);

// Port setup (using environment variable or fallback to 3000)
const PORT = process.env.PORT || 3000;

// Database connection and server start
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
