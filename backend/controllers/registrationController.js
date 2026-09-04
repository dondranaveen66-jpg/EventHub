const db = require("../config/db");

// ===============================
// REGISTER USER FOR AN EVENT
// ===============================

const registerForEvent = (req, res) => {
    try {
        // Get event ID from frontend
        const { eventId } = req.body;

        // Get logged-in user ID from JWT
        const userId = req.user.userId;

        // Check event ID
        if (!eventId) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        // Check if the event exists
        db.query(
            "SELECT * FROM events WHERE event_id = ?",
            [eventId],
            (error, eventResults) => {

                if (error) {
                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                if (eventResults.length === 0) {
                    return res.status(404).json({
                        message: "Event not found"
                    });
                }

                // Register user for event
                db.query(
                    `INSERT INTO registrations (user_id, event_id)
                     VALUES (?, ?)`,
                    [userId, eventId],
                    (error, result) => {

                        if (error) {

                            // Prevent duplicate registration
                            if (error.code === "ER_DUP_ENTRY") {
                                return res.status(400).json({
                                    message: "You are already registered for this event"
                                });
                            }

                            return res.status(500).json({
                                message: "Registration failed",
                                error: error.message
                            });
                        }

                        res.status(201).json({
                            message: "Successfully registered for the event!",
                            registrationId: result.insertId
                        });
                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    registerForEvent
};