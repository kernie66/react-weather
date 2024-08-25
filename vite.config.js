import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react-swc';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import vConsolePlugin from 'vite-plugin-simple-vconsole';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            axios: ['axios'],
          },
        },
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [jotaiDebugLabel, jotaiReactRefresh],
        },
      }),
      eslintPlugin(),
      vConsolePlugin({
        enable: true,
      }),
    ],
    server: {
      host: true, // '192.168.1.44',
      port: env.PORT,
      // origin: `http://0.0.0.0:${env.PORT}`,
      strictPort: true,
      fs: {
        cachedChecks: false,
      },
    },
  };
});
