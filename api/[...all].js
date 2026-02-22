let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const dotenvModule = await import("dotenv");
      dotenvModule.default.config();

      const [{ connectDB }, appModule] = await Promise.all([
        import("../backend/src/config/db.js"),
        import("../backend/src/app.js"),
      ]);

      await connectDB();
      return appModule.default;
    })();
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
      detail: error?.message || "unknown",
    });
  }
};

