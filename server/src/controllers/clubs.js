const db = require("../db");

exports.getClubs = async (req, res) => {
    const { id } = req.params;
    try {
        const club = await db.query("SELECT * FROM clubs");
        if (club.rows.length === 0)
            return res.status(404).json({ error: "Clubs not found" });
        res.json(club.rows);
    } catch (error) {
        res.status(500).json({ error: "Error fetching clubs" });
    }
};

exports.getID = async (req, res) => {
    const { id } = req.params;
    try {
        const club = await db.query("SELECT * FROM clubs WHERE club_id = $1", [id]);
        if (club.rows.length === 0)
            return res.status(404).json({ error: "Club not found" });
        res.json(club.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching club" });
    }
};

exports.saveClub = async (req, res) => {
    const { club_id } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const existing = await db.query(
            "SELECT * FROM user_saved_clubs WHERE user_id = $1 AND club_id = $2",
            [user_id, club_id]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "Club already saved" });
        }

        await db.query(
            "INSERT INTO user_saved_clubs (user_id, club_id) VALUES ($1, $2)",
            [user_id, club_id]
        );

        res.status(201).json({ message: "Club saved successfully" });
    } catch (error) {
        console.error("Error in saveClub:", error);
        res.status(500).json({ error: "Error saving club" });
    }
};

exports.getSavedClubs = async (req, res) => {
    const user_id = req.user?.id;

    try {
        const result = await db.query(
            `
            SELECT c.*
            FROM clubs c
            JOIN user_saved_clubs usc ON c.club_id = usc.club_id
            WHERE usc.user_id = $1;
            `,
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No saved clubs found for this user" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching saved clubs" });
    }
};

exports.unsaveClub = async (req, res) => {
    const user_id = req.user.id;
    const { id: club_id } = req.params;

    try {
        // check if the club is saved by the user
        const existing = await db.query(
            "SELECT * FROM user_saved_clubs WHERE user_id = $1 AND club_id = $2",
            [user_id, club_id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Club not found in saved list" });
        }

        // remove the saved club
        await db.query(
            "DELETE FROM user_saved_clubs WHERE user_id = $1 AND club_id = $2",
            [user_id, club_id]
        );

        res.status(200).json({ message: "Club unsaved successfully" });
    } catch (error) {
        console.error("Error unsaving club:", error);
        res.status(500).json({ error: "Error unsaving the club" });
    }
};
