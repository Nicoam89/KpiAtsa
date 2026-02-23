import { defineConfig, mergeConfig } from "vite";
import frontendConfig from "./frontend/vite.config.js";

export default mergeConfig(
  frontendConfig,
  defineConfig({
    root: "frontend",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
  })
);