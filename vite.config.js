import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://backend.local", // Your backend URL
        changeOrigin: true, // Ensures the host header matches the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Adjust the API path if necessary
      },
    },
  },
});
