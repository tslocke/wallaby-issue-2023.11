import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtools from 'solid-devtools/vite'

export default defineConfig(({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    server: {
      port: +(process.env.VITE_PORT ?? 3000)
    },

    plugins: [
      tsconfigPaths({loose: true}),
      solid({
        babel: {
          plugins: [
            // ["@locator/babel-jsx/dist", {env: "development"}],
          ],
        }
      })
    ],

    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
      minify: false,
      chunkSizeWarningLimit: 600,
      sourcemap: true,
      rollupOptions: {
        input: './src/main.tsx',
        output: {
          assetFileNames: "[name][extname]",
          chunkFileNames: "[name].js",
          entryFileNames: "[name].js",
          manualChunks: () => "main.js"
        }
      }
    },

    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },

    define: {
      ...(mode == 'production' ? {} : {'__REACT_DEVTOOLS_GLOBAL_HOOK__': '{ "isDisabled": true }'}),
      
      ...(mode == 'test' ? {} : 
        {
          "process.env": {
            TAILWIND_MODE: JSON.stringify("build"),
          },
    
          "process.platform": JSON.stringify(""),
    
          "process.versions": null,
        }
      )
    },

    test: {
      environment: 'jsdom',
      transformMode: {
        web: [/\.[jt]sx?$/],
      },
      // solid needs to be inline to work around
      // a resolution issue in vitest:
      deps: {
        inline: [/solid-js/, /solid-app-router/],
      },
      // if you have few tests, try commenting one
      // or both out to improve performance:
      threads: true,
      isolate: true,
      globals: true
    },

    resolve: {
      conditions: ['development', 'browser'],
      alias: [
        {find: 'glob-parent', replacement: 'src/fake-modules.ts'},
        {find: 'fast-glob', replacement: 'src/fake-modules.ts'},
        {find: 'fs', replacement: 'src/fake-modules.ts'},
        {find: 'os', replacement: 'src/fake-modules.ts'},
        {find: 'path', replacement: 'src/fake-modules.ts'},
        {find: 'source-map-js', replacement: 'src/fake-modules.ts'},
        {find: 'crypto', replacement: 'src/fake-modules.ts'},
        {find: 'url', replacement: 'node_modules/native-url/dist/index.js'},
      ]
    },
  }
})
