import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      eslintPlugin(),
      legacy(/*{
        modernTargets: [
          'defaults',
          'chrome >= 92',
          'last 2 firefox version',
          'last 2 safari version',
          'ios >= 12',
        ],
      }*/),
    ],
    server: {
      host: '192.168.1.44',
      port: env.PORT,
      fs: {
        cachedChecks: false,
      },
    },
  };
});
