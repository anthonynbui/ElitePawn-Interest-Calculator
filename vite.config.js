import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 this is what actually runs Tailwind
  ],
    base: process.env.VITE_BASE_PATH || "/ElitePawn-Interest-Calculator",

});
