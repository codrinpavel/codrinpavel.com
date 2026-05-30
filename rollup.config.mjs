import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const dev = process.env.ELEVENTY_ENV !== 'production';

const cssnanoOptions = {
  preset: ['default', {
    mergeRules: false,
    discardDuplicates: false,
    discardOverridden: false,
    cssDeclarationSorter: false,
    orderedValues: false,
  }],
};

const postcssPlugin = (dev) => [
  postcss({
    extract: true,
    minimize: dev ? false : cssnanoOptions,
    sourceMap: dev ? 'inline' : false,
    plugins: [autoprefixer()],
  })
];

const onWarn = (warning, warn) => {
  /**
   * Ignore file name conflict warning
   * Rollup expects a .js file output that would in turn generate a css file,
   * but we're skipping that step, generating CSS directly
   * 
   * @link https://github.com/egoist/rollup-plugin-postcss/issues/326#issuecomment-706463089
   */
  if (warning.code === 'FILE_NAME_CONFLICT') return;
  warn(warning);
};

// Common file configuration template
const CSSConfig = (fileName, dev) => ({
  input: `src/assets/sass/${fileName}/_index.scss`,
  output: {
    file: `dist/assets/min/${fileName}/${fileName}.min.css`,
    sourcemap: false,
  },
  onwarn: onWarn,
  plugins: postcssPlugin(dev),
});

export default [
  {
    input: "src/assets/js/main.js",
    output: {
      file: "dist/assets/min/main.min.js",
      sourcemap: false,
      format: dev ? "iife" : "esm",
    },
    plugins: [
      resolve(), // for importing node_modules dependencies, such as cash-dom
      commonjs(), // jquery doesn't support esm imports
      !dev && terser()
    ]
  },
  CSSConfig('01.theme', dev),
  CSSConfig('02.base', dev),
  CSSConfig('03.components', dev),
  CSSConfig('04.utilities', dev),
  CSSConfig('05.app', dev),
];
