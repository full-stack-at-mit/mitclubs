const db = require("../db");

exports.getClubs = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select club_id, name, type, website from clubs"
    );
    console.log("working!");
    console.log(rows);
    return res.status(200).json({ success: true, clubs: rows });
  } catch (error) {
    console.log(error.message);
  }
};
