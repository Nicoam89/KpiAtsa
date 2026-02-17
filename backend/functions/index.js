const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// tus rutas acá
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

exports.api = functions.https.onRequest(app);
