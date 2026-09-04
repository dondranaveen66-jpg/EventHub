
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// =====================================
// DATABASE
// =====================================

require("./config/db");

// =====================================
// ROUTES
// =====================================

const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const dashboardRoutes = require("./routes/dashboardroutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");

// =====================================
// CREATE APP
// =====================================

const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());
app.use(express.json());

// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {
    res.send("EventHub Backend is Running!");
});

// =====================================
// DATABASE TEST ROUTE
// =====================================

app.get("/test-db", (req, res) => {
    res.json({
        message: "Database route is working!"
    });
});

// =====================================
// AUTH ROUTES
// =====================================

app.use("/api/auth", authRoutes);

// =====================================
// REGISTRATION ROUTES
// =====================================

app.use("/api/registrations", registrationRoutes);

// =====================================
// DASHBOARD ROUTES
// =====================================

app.use("/api/dashboard", dashboardRoutes);

// =====================================
// PUBLIC EVENT ROUTES
// =====================================

app.use("/api/events", eventRoutes);

// =====================================
// ADMIN ROUTES
// =====================================

app.use("/api/admin", adminRoutes);

// =====================================
// SERVER
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

