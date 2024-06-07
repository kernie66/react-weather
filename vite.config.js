import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), eslintPlugin()],
    server: {
      port: env.PORT,
      fs: {
        cachedChecks: false,
      },
    },
  };
});
