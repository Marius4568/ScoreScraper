import express from "express";
import { getNbaScores } from "../controllers/getNbaScores";

const router = express.Router();

router.get("/", getNbaScores);

export default router;
