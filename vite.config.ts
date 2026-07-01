import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/fieldnotes-portfolio/",
  plugins: [react()],
  build: {
    sourcemap: false
  }
});
