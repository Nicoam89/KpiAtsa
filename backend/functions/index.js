const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const kpiRoutes = require("./routes/kpiRoutes");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// 🔹 Ruta de prueba
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// 🔹 Ruta de KPIs
app.get("/kpis", (req, res) => {
  const { period } = req.query;

  res.json({
    message: "KPIs funcionando",
    period
  });
});


app.use("/auth", authRoutes);
app.use("/kpis", kpiRoutes);

exports.api = functions.https.onRequest(app);
