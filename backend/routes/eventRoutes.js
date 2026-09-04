const express = require("express");
const router = express.Router();

const {
    getPublicEvents
} = require("../controllers/eventcontroller");

// Public route
router.get("/", getPublicEvents);

module.exports = router;
