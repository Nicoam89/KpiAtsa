import express from "express";
import cors from "cors";
import kpiRoutesImport from "../functions/routes/kpi.routes.js";
import authRoutesImport from "../functions/routes/auth.routes.js";

const kpiRoutes = kpiRoutesImport?.default || kpiRoutesImport;
const authRoutes = authRoutesImport?.default || authRoutesImport;


const app = express();

app.use(cors());
app.use(express.json());

if (typeof kpiRoutes === "function") {
  app.use("/api/kpis", kpiRoutes);
  app.use("/kpis", kpiRoutes);
}

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend funcionando" });
});

if (typeof authRoutes === "function") {
  app.use("/api/auth", authRoutes);
  app.use("/auth", authRoutes);
}

export default app;
