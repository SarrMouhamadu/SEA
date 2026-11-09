import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: false,
        babelrc: false,
        browserslistConfigFile: false,
        targets: { esmodules: true }
      }
    })
  ],
  server: {
    port: 3000,
    host: true,
    fs: {
      strict: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
});
