import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Example: componentTagger plugin import
import componentTagger from "vite-plugin-component-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8087,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // now mode is defined
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
