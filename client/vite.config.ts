import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['quantrabyte.com', 'localhost', '127.0.0.1'], // yahan apne domain add karo
    // Forward API calls to the Express server so root-relative fetches work in dev.
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads": { target: "http://localhost:5000", changeOrigin: true },
      "/contact": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
  // `vite preview` has its own server config, so mirror the proxy here too.
  preview: {
    port: 8080,
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads": { target: "http://localhost:5000", changeOrigin: true },
      "/contact": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
