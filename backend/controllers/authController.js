const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER NEW USER
// ===============================

const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email and password"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, results) => {
            if (error) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            db.query(
                `INSERT INTO users
                (name, email, password)
                VALUES (?, ?, ?)`,
                [name, email, hashedPassword],
                (error, result) => {
                    if (error) {
                        return res.status(500).json({
                            message: "Failed to register user"
                        });
                    }

                    res.status(201).json({
                        message: "User registered successfully!",
                        userId: result.insertId
                    });
                }
            );
        }
    );

} catch (error) {
    res.status(500).json({
        message: "Server error"
    });
}


};

// ===============================
// LOGIN USER
// ===============================

const loginUser = (req, res) => {
try {
const { email, password } = req.body;


    // Check fields
    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        });
    }

    // Find user by email
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, results) => {

            if (error) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            // User not found
            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = results[0];

            // Compare entered password with hashed password
            const isPasswordCorrect =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Create JWT token
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET || "eventhub_secret_key",
                {
                    expiresIn: "1d"
                }
            );

            // Send successful response
            res.status(200).json({
                message: "Login successful!",
                token: token,
                user: {
                    userId: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );

} catch (error) {
    res.status(500).json({
        message: "Server error"
    });
}


};

module.exports = {
registerUser,
loginUser
};
