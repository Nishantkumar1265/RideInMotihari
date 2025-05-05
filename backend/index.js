const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./Config/db");

// Routes
const userRoutes = require("./api/userApi");
const serviceProviderRoutes = require("./api/serviceProviderApi");
const bookingRoutes = require("./api/bookingApi");
const serviceTypeRoutes = require("./api/serviceTypeApi");
const Auth = require("./models/authModel/authModels.js");
const authRoutes = require("./api/authApi.js");

// Middleware
app.use(express.json());
app.use(cors());

// Route prefixing
app.use("/api/users", userRoutes);
app.use("/api/service-providers", serviceProviderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/service-types", serviceTypeRoutes);
app.use("/api/auth", authRoutes);

// Port setup (using environment variable or fallback to 3000)
const PORT = process.env.PORT || 3000;

// Database connection and server start
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
