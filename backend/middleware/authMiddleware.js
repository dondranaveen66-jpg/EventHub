const jwt = require("jsonwebtoken");

// =====================================
// VERIFY JWT TOKEN
// =====================================

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied. Token is required."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token."
        });

    }
};


// =====================================
// VERIFY ADMIN
// =====================================

const verifyAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated."
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
};


module.exports = {
    verifyToken,
    verifyAdmin
};