
const db = require("../config/db");

// =====================================
// GET PUBLIC EVENTS
// =====================================

const getPublicEvents = (req, res) => {

    const sql = `
        SELECT
            event_id,
            event_name,
            description,
            event_date,
            event_location
        FROM events
        WHERE event_date >= CURDATE()
        ORDER BY event_date ASC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.error("Get public events error:", error);

            return res.status(500).json({
                message: "Failed to fetch events",
                error: error.message
            });
        }

        res.status(200).json({
            message: "Events fetched successfully",
            events: results
        });
    });
};

module.exports = {
    getPublicEvents
};

