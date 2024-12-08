// here, put all routes related to authentication

// imports
const { Router } = require("express");
// const { getClubs, getID, addClub, updateClub, deleteClub } = require("../controllers/clubs");
const {getClubs, getID } = require("../controllers/clubs");
const { saveClub } = require("../controllers/clubs");
const { userAuth } = require("../middlewares/auth-middleware");
const { getSavedClubs } = require("../controllers/clubs");
const { unsaveClub } = require("../controllers/clubs.js");

const router = Router();

router.get("/clubs", getClubs);
router.get("/clubs/:id", getID);
// router.post("/club", addClub);
// router.put("/club", updateClub);
// router.delete("/club",  deleteClub);

router.post("/save-club", userAuth, saveClub);
router.get("/saved-clubs", userAuth, getSavedClubs);
router.delete("/unsave-club/:id", userAuth, unsaveClub);

module.exports = router;
