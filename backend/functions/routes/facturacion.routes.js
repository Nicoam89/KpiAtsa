import { Router } from "express";
import { getFacturacion } from "../controllers/facturacion.controller.js";

const router = Router();

router.get("/", getFacturacion);

export default router;
