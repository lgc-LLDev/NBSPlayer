import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        name: 'nbsPlay',
        file: './dist/index.js',
        format: 'cjs',
      },
    ],
    plugins: [nodeResolve(), typescript(), terser()],
  },
];
