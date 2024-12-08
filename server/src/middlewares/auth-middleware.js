const passport = require("passport");

exports.userAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            console.error("Authentication Error:", err);
            return res.status(500).json({ error: "Authentication error" });
        }
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user; // Attach authenticated user to req.user
        console.log("Authenticated User test:", req.user);
        next();
    })(req, res, next);
};

