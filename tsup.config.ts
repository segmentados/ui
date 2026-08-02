import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // React y las libs runtime las provee el consumidor (no se bundlean → sin duplicados).
  external: ['react', 'react-dom', 'lucide-react', 'clsx', 'tailwind-merge', 'zustand'],
});
