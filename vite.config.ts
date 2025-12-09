import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // ✅ ESSENCIAL para o Vercel carregar os arquivos JS corretamente
  plugins: [react(), tailwindcss()],
});
