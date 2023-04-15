const express = require("express")
const {getNbaScores} = require("../controllers/getNbaScores")

const router = express.Router();

router.get("/", getNbaScores)

module.exports = router;