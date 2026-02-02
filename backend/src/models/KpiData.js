import mongoose from "mongoose";

const KpiDataSchema = new mongoose.Schema({
  kpi: { type: String, required: true }, // facturacion, dso, etc
  period: { type: String, enum: ["MTD", "YTD"], required: true },

  value: { type: Number, required: true },

  forecast: { type: Number },
  lastYear: { type: Number },

  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("KpiData", KpiDataSchema);