import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

let devProxyServer = "https://s.fyi";
if (process.env.DEV_PROXY_SERVER && process.env.DEV_PROXY_SERVER.length > 0) {
  console.log("Use devProxyServer from environment: ", process.env.DEV_PROXY_SERVER);
  devProxyServer = process.env.DEV_PROXY_SERVER;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
    proxy: {
      "^/api": {
        target: devProxyServer,
        xfwd: true,
        changeOrigin: true,
      },
      "^/memos.api.v1": {
        target: devProxyServer,
        xfwd: true,
        changeOrigin: true,
      },
      "^/file": {
        target: devProxyServer,
        xfwd: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "app.[hash].js",
        chunkFileNames: "assets/chunk-vendors.[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
});
