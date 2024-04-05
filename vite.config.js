import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/quiz-app/",
  plugins: [react()],
  build: {
    outDir: "dist", // Change 'build' to 'dist' or your desired directory name
  },
});
