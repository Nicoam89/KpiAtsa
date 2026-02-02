import { Facturacion } from "../models/Facturacion.js";

export const getFacturacion = async (req, res) => {
  try {
    const data = await Facturacion.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo facturación" });
  }
};
