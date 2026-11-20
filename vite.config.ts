import { rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Prevents raw source images placed in public/images/ from being published
 * verbatim into dist/images/. Only explicitly vetted, optimized assets imported
 * from src/assets/media/ are emitted into dist/assets/ with content hashes.
 */
function excludeRawPublicImages(): Plugin {
  let outDir = 'dist';
  let rootDir = '.';

  return {
    name: 'exclude-raw-public-images',
    configResolved(config) {
      rootDir = config.root;
      outDir = config.build.outDir;
    },
    closeBundle() {
      const rawMirrorDir = resolve(rootDir, outDir, 'images');
      if (existsSync(rawMirrorDir)) {
        rmSync(rawMirrorDir, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), excludeRawPublicImages()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap', '@gsap/react'],
        },
      },
    },
  },
});
