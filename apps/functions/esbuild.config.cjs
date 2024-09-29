require('esbuild')
  .build({
    // the entry point file described above
    entryPoints: ['src/index.ts'],
    // the build folder location described above
    outfile: 'dist/index.js',
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'esm',
    // Optional and for development only. This provides the ability to
    // map the built code back to the original source format when debugging.
    //sourcemap: 'inline',
    external: ['./node_modules/*'],
    logLevel: 'info',
    tsconfig: './tsconfig.json',
    //conditions: ['@custom/validators'],
  })
  .catch(() => process.exit(1))
