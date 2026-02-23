import { defineConfig } from "vite";

export default defineConfig({
  // Common configuration
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
