const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
    registerForEvent
} = require("../controllers/registrationController");

// Register logged-in user for an event
router.post(
    "/register",
    verifyToken,
    registerForEvent
);

module.exports = router;