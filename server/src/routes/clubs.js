// here, put all routes related to clubs

// imports
const { Router } = require("express");
const { getClubs } = require("../controllers/clubs");

const router = Router();

router.get("/get-clubs", getClubs);

module.exports = router;
