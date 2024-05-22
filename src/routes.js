import express from "express";
import { travelGuideController } from "./controllers.js";

const router = express.Router();

router.post("/travel-guide", travelGuideController);

export default router;