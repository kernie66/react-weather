import { defineConfig, loadEnv } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react-swc';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import vConsolePlugin from 'vite-plugin-simple-vconsole';
import topLevelAwait from 'vite-plugin-top-level-await';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
// import MillionLint from '@million/lint';

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
      // MillionLint.vite(),
      react({
        babel: {
          plugins: [jotaiDebugLabel, jotaiReactRefresh],
        },
      }),
      eslintPlugin(),
      vConsolePlugin({
        enable: false,
      }),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
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
    test: {
      globals: true,
      environment: 'jsdom',
      globalSetup: './testing-utils/setupTestGlobals.js',
      setupFiles: [
        './testing-utils/vitest.setup.mjs',
        './testing-utils/setupTests.js',
      ],
      coverage: {
        exclude: [
          'testing-utils/**',
          '**/mocks/**',
          ...coverageConfigDefaults.exclude,
        ],
      },
      snapshotSerializers: ['./testing-utils/mantineSerializer.ts'],
    },
  };
});
