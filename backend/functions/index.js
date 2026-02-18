import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import kpiRoutes from "./routes/kpi.routes.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/kpis", kpiRoutes);

export const api = functions.https.onRequest(app);
