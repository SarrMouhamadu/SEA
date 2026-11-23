import { defineConfig } from 'vite';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Plugin Vite pour s'assurer que le serveur backend Node.js (port 5001)
 * est toujours automatiquement démarré lorsque le frontend démarre.
 */
function autoBackendPlugin() {
  let backendProcess = null;

  return {
    name: 'auto-backend-server',
    configureServer() {
      const serverScript = path.resolve(__dirname, '../server/src/server.js');

      // Vérifie si le serveur backend répond déjà
      const checkReq = http.get('http://127.0.0.1:5001/api/health', () => {
        // Déjà démarré, rien à faire
      });

      checkReq.on('error', () => {
        // Le serveur backend n'est pas encore démarré -> on le lance automatiquement
        console.log('\n🚀 [Auto-Backend] Démarrage automatique du serveur API Node.js (port 5001)...');
        backendProcess = spawn('node', [serverScript], {
          stdio: 'inherit',
          cwd: path.resolve(__dirname, '../server')
        });

        backendProcess.on('error', (err) => {
          console.error('❌ [Auto-Backend] Erreur lancement backend:', err.message);
        });
      });

      const cleanup = () => {
        if (backendProcess && !backendProcess.killed) {
          try {
            backendProcess.kill();
          } catch (e) {}
        }
      };

      process.on('exit', cleanup);
      process.on('SIGINT', () => { cleanup(); process.exit(); });
      process.on('SIGTERM', () => { cleanup(); process.exit(); });
    }
  };
}

export default defineConfig({
  plugins: [autoBackendPlugin()],
  esbuild: {
    jsx: 'automatic'
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 3000,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      }
    }
  }
});
