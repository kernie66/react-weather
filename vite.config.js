import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import legacy from 'vite-plugin-legacy-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), eslintPlugin(), legacy()],
    server: {
      host: '192.168.1.44',
      port: env.PORT,
      fs: {
        cachedChecks: false,
      },
    },
  };
});
