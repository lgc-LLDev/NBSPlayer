import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        name: 'NBSPlayer',
        file: './dist/NBSPlayer.js',
        format: 'cjs',
      },
    ],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript(),
      /* terser(), */
    ],
  },
];
