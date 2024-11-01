import * as esbuild from 'esbuild'
import esbuildPluginTsc from 'esbuild-plugin-tsc'

export function createBuildSettings(options) {
  return {
    entryPoints: ['src/main.ts'],
    outfile: 'dist/bundle.js',
    bundle: true,
    plugins: [
      esbuildPluginTsc({
        force: true
      }),
    ],
    platform: 'node',
    ...options
  };
}

const settings = createBuildSettings({ minify: true })

await esbuild.build(settings);