let appPromise;

function getApp() {
  if (!appPromise) {
    appPromise = import("../backend/src/app.js").then((mod) => mod.default);
  }

  return appPromise;
}

module.exports = async (req, res) => {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("Error loading backend app:", error);
    return res.status(500).json({
      error: "BACKEND_BOOT_ERROR",
      message: "No se pudo inicializar la API en Vercel.",
    });
  }
};
