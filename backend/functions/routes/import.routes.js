import { Router } from "express";
import { importFacturacion } from "../controllers/import.controller.js";

const router = Router();

router.post("/facturacion", importFacturacion);

export default router;
