const db = require("../config/db");

// =====================================
// GET ALL EVENTS
// =====================================

const getAllEvents = (req, res) => {

    const sql = `
        SELECT
            event_id,
            event_name,
            description,
            event_date,
            event_location,
            created_at
        FROM events
        ORDER BY event_date ASC
    `;

    db.query(sql, (error, results) => {

        if (error) {
            console.error("Get events error:", error);

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


// =====================================
// ADD EVENT
// =====================================

const addEvent = (req, res) => {

    const {
        event_name,
        description,
        event_date,
        event_location
    } = req.body;

    if (
        !event_name ||
        !description ||
        !event_date ||
        !event_location
    ) {
        return res.status(400).json({
            message: "All event fields are required"
        });
    }

    const sql = `
        INSERT INTO events
        (event_name, description, event_date, event_location)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            event_name,
            description,
            event_date,
            event_location
        ],
        (error, result) => {

            if (error) {
                console.error("Add event error:", error);

                return res.status(500).json({
                    message: "Failed to add event",
                    error: error.message
                });
            }

            res.status(201).json({
                message: "Event added successfully!",
                eventId: result.insertId
            });
        }
    );
};


// =====================================
// UPDATE EVENT
// =====================================

const updateEvent = (req, res) => {

    const eventId = req.params.id;

    const {
        event_name,
        description,
        event_date,
        event_location
    } = req.body;

    if (
        !event_name ||
        !description ||
        !event_date ||
        !event_location
    ) {
        return res.status(400).json({
            message: "All event fields are required"
        });
    }

    const sql = `
        UPDATE events
        SET
            event_name = ?,
            description = ?,
            event_date = ?,
            event_location = ?
        WHERE event_id = ?
    `;

    db.query(
        sql,
        [
            event_name,
            description,
            event_date,
            event_location,
            eventId
        ],
        (error, result) => {

            if (error) {
                console.error("Update event error:", error);

                return res.status(500).json({
                    message: "Failed to update event",
                    error: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Event not found"
                });
            }

            res.status(200).json({
                message: "Event updated successfully!"
            });
        }
    );
};


// =====================================
// DELETE EVENT
// =====================================

const deleteEvent = (req, res) => {

    const eventId = req.params.id;

    const sql = `
        DELETE FROM events
        WHERE event_id = ?
    `;

    db.query(
        sql,
        [eventId],
        (error, result) => {

            if (error) {
                console.error("Delete event error:", error);

                return res.status(500).json({
                    message: "Failed to delete event",
                    error: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Event not found"
                });
            }

            res.status(200).json({
                message: "Event deleted successfully!"
            });
        }
    );
};


// =====================================
// EXPORT FUNCTIONS
// =====================================

module.exports = {
    getAllEvents,
    addEvent,
    updateEvent,
    deleteEvent
};