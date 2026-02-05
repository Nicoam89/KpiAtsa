import express from "express";
import cors from "cors";
import kpiRoutes from "./routes/kpi.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/kpis", kpiRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend funcionando" });
});

app.use("/api/auth", authRoutes);

export default app;
