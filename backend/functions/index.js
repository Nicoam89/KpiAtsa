import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import kpiRoutes from "./routes/kpi.routes.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", scope: "firebase-functions" });
});

app.get("/auth/test", (req, res) => {
  res.json({ ok: "auth funcionando" });
});

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.use("/kpis", kpiRoutes);
app.use("/api/kpis", kpiRoutes);

export const api = functions.https.onRequest(app);
