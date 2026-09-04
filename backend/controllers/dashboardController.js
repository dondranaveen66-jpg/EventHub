const db = require("../config/db");

const getMyRegistrations = (req, res) => {
    const userId = req.user.userId;

    const sql = `
        SELECT
            registrations.registration_id,
            events.event_id,
            events.event_name,
            events.description,
            events.event_date,
            events.event_location,
            registrations.registration_date
        FROM registrations
        INNER JOIN events
            ON registrations.event_id = events.event_id
        WHERE registrations.user_id = ?
        ORDER BY events.event_date ASC
    `;

    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Dashboard database error:", error);

            return res.status(500).json({
                message: "Database error",
                error: error.message
            });
        }

        res.status(200).json({
            message: "Registrations fetched successfully",
            registrations: results
        });
    });
};

module.exports = {
    getMyRegistrations
};