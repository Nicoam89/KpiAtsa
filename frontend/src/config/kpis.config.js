export const KPI_CONFIG = [
  // ───────────── FINANZAS ─────────────
  {
    id: "facturacion",
    title: "Facturación",
    category: "Finanzas",
    unit: "USD",
    direction: "up",
    order: 1
  },
  {
    id: "deudores_ventas",
    title: "Deudores por Ventas",
    category: "Finanzas",
    unit: "USD",
    direction: "down",
    order: 2
  },
  {
    id: "dso",
    title: "DSO",
    category: "Finanzas",
    unit: "días",
    direction: "down",
    order: 3
  },
  {
    id: "prov_ext",
    title: "Proveedores Exterior",
    category: "Finanzas",
    unit: "USD",
    direction: "down",
    order: 4
  },
  {
    id: "pagos_exterior",
    title: "Pagos al Exterior",
    category: "Finanzas",
    unit: "USD",
    direction: "up",
    order: 5
  },
  {
    id: "tipo_cambio",
    title: "Tipo de Cambio",
    category: "Finanzas",
    unit: "ARS/USD",
    direction: "up",
    order: 6
  },
  {
    id: "cobertura_cfe",
    title: "Cobertura CFE",
    category: "Finanzas",
    unit: "%",
    direction: "up",
    order: 3
  },


  // ───────────── OPERACIONES ─────────────
  {
    id: "horas_st",
    title: "Horas Servicio Tecnico",
    category: "Operaciones",
    unit: "Hs",
    direction: "up",
    order: 1
  },
  {
    id: "backlog",
    title: "Backlog",
    category: "Operaciones",
    unit: "Hs",
    direction: "up",
    order: 2
  },


  // ───────────── PERSONAS ─────────────
  {
    id: "ausentismo",
    title: "Ausentismo",
    category: "RRHH",
    unit: "%",
    direction: "down",
    order: 1
  }
];
