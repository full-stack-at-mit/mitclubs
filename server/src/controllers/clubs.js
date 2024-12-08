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
