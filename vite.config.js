import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react-swc';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import vConsolePlugin from 'vite-plugin-simple-vconsole';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    build: {
      outDir: 'dist',
    },
    plugins: [
      react(),
      eslintPlugin(),
      vConsolePlugin({
        enable: true,
      }),
    ],
    server: {
      //      host: '192.168.1.44',
      port: env.PORT,
      strictPort: true,
      fs: {
        cachedChecks: false,
      },
    },
  };
});
