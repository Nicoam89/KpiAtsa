// 💰 moneda USD
const currencyUSD = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

// 💰 moneda ARS
const currencyARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

// 🔢 número común
const number = new Intl.NumberFormat("es-AR");

// 📊 porcentaje
const percent = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1
});

export function formatValue(value, unit) {
  if (value === null || value === undefined) return "-";

  switch (unit) {
    case "USD":
      return currencyUSD.format(value);

    case "ARS":
      return currencyARS.format(value);

    case "%":
      return `${percent.format(value)}%`;

    case "días":
      return `${number.format(value)} días`;

    case "Hs":
      return `${number.format(value)} hs`;

    case "ARS/USD":
      return number.format(value);

    case "M USD":
      return `${number.format(value)} M`;

    default:
      return number.format(value);
  }
}
