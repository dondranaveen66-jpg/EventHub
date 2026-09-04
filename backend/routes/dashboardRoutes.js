const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
    getMyRegistrations
} = require("../controllers/dashboardController");

router.get(
    "/my-registrations",
    verifyToken,
    getMyRegistrations
);

module.exports = router;