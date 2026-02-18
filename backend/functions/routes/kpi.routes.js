import { Router } from "express";
import { getKpis } from "../controllers/kpi.controller.js";

const router = Router();

router.get("/", getKpis);

export default router;
