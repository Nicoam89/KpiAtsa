import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

app.use("/api/auth", authRoutes);