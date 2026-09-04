const express = require("express");
const router = express.Router();

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

const {
    getAllEvents,
    addEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/adminController");

// Get all events
router.get(
    "/events",
    verifyToken,
    verifyAdmin,
    getAllEvents
);

// Add event
router.post(
    "/events",
    verifyToken,
    verifyAdmin,
    addEvent
);

// Update event
router.put(
    "/events/:id",
    verifyToken,
    verifyAdmin,
    updateEvent
);

// Delete event
router.delete(
    "/events/:id",
    verifyToken,
    verifyAdmin,
    deleteEvent
);

module.exports = router;