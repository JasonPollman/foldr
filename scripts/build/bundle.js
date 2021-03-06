/**
 * Creates a bundled, full UMD versions of each package using webpack.
 * This will emit a UMD version and source map for each non-internal package
 * at `dist/[package].min.js`.
 * @since 10/27/18
 * @file
 */

import zlib from 'zlib';
import path from 'path';
import webpack from 'webpack';
import Promise from 'bluebird';
import compose from 'p-compose';
import fs from 'fs-extra-promise';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import {
  red,
  cyan,
  green,
  magenta,
} from 'chalk';

import {
  PROJECT_ROOT,
  DIST_DESTINATION,
  DIST_PACKAGE_ROOT,
  PROJECT_CACHES_ROOT,
  PROJECT_PACKAGES_ROOT,
} from '../constants';

import {
  log,
  logTap,
  getENV,
} from '../utils';

import babelrc from '../../babel.config';
import packageJson from '../../package.json';

const NODE_ENV = getENV('NODE_ENV', 'production');
const webpackAsync = Promise.promisify(webpack);
const mangeCacheSourcepath = path.join(PROJECT_CACHES_ROOT, 'mangle-cache.json');

let mangleCache;

try {
  mangleCache = fs.readJsonSync(mangeCacheSourcepath);
} catch (e) {
  mangleCache = {};
}

/**
 * The banner applied to the top of each bundle file.
 * @todo This could use some TLC and a copyright.
 * @type {string}
 */
const banner = `
The @foldr library.
@version ${packageJson.version}
@built ${new Date().toISOString()}
@license ${packageJson.license}
`;

/**
 * Base webpack config applied to each entry.
 * @type {Object}
 */
const BASE_WEBPACK_CONFIG = {
  entry: {
    foldr: path.join(DIST_PACKAGE_ROOT, 'dist', 'index.mjs'),
  },
  mode: NODE_ENV,
  devtool: 'source-map',
  // target: 'web',
  // Tell webpack not to shim node globals, since @folder/internal-env
  // handles this in a way that's agnostic to webpack.
  // This also reduces about 2kb in bundle sizes.
  node: false,
  output: {
    path: DIST_DESTINATION,
    filename: '[name].min.js',
    library: '[name]',
    libraryTarget: 'umd',
    // Fixes not being able to require the webpack UMD modules in Node.js
    // and in other cases where `window` isn't defined (webworker?).
    globalObject: "(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : this)",
    // Fixes sourcemapping file paths.
    // Since each package is independently bundled, we don't
    // need to sourcemaps to reference actual project paths.
    devtoolModuleFilenameTemplate(info) {
      return `foldr:///${path.relative(PROJECT_ROOT, info.absoluteResourcePath)}`;
    },
  },
  resolve: {
    mainFiles: ['dist/index'],
    mainFields: ['module', 'main'],
    extensions: ['.mjs'],
  },
  module: {
    rules: [
      {
        type: 'javascript/esm',
        test: /\.mjs$/,
        enforce: 'pre',
        use: [
          // Uses the source map in `[package]/dist/index.js.map`
          // So we don't have to re-transpile the code to get
          // proper source maps.
          {
            loader: 'source-map-loader',
          },
          // Make sure everything is transpiled down to ES5
          // in the ESM code, since babel.config.js:env.esm
          // doesn't acutally transform anything.
          {
            loader: 'babel-loader',
            options: {
              ...babelrc,
              envName: 'webpack',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: banner.trim() }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ],
};

/**
 * Creates the webpack config for bundling.
 * @param {Array<string>} packages The list packages to bundle (absolute filepaths).
 * @returns {Object} The prepared webpack configuration.
 */
function generateWebpackConfig() {
  const config = { ...BASE_WEBPACK_CONFIG };

  // Only minimize the ejected bundle if not building for dev.
  if (NODE_ENV !== 'development') {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            parse: {},
            compress: {},
            mangle: {
              properties: { regex: /^\$\$/ },
            },
            output: null,
            toplevel: true,
            nameCache: mangleCache,
            ie8: false,
            keep_fnames: false,
          },
        }),
      ],
    };
  }
  return config;
}

/**
 * Prints information about the `full` bundle size.
 * @returns {undefined}
 */
async function logBundleSizeStats() {
  const source = path.join(DIST_DESTINATION, 'foldr.min.js');
  const contents = await fs.readFileAsync(source);

  const gzipped = await new Promise((resolve, reject) => zlib.gzip(contents, (err, results) => {
    if (err) return reject(err);
    return resolve(results);
  }));

  log(
    magenta.bold('Size of `foldr.min.js` distributable is %skb (%skb gzipped)'),
    (Buffer.byteLength(contents) / 1000).toFixed(2),
    (Buffer.byteLength(gzipped) / 1000).toFixed(2),
  );
}

/**
 * Throws an error if bundling failed at all.
 * @param {Object} stats The status object from webpack compilation.
 * @returns {undefined}
 */
function validateBundles(stats) {
  if (!stats.hasErrors()) {
    return log('\n%s\n', stats.toString({
      colors: true,
      assets: true,
      chunks: false,
      modules: false,
      children: false,
      entrypoints: false,
      chunkModules: false,
      chunkOrigins: false,
    }));
  }

  throw new Error(stats.toJson().errors[0]);
}

/**
 * Emits the new mangle-property cache.
 * @returns {Promise} Resolves once the file has been written to disk.
 */
function outputMangleCache() {
  return fs.outputJsonAsync(mangeCacheSourcepath, mangleCache);
}

const transpile = compose(
  logBundleSizeStats,
  outputMangleCache,
  logTap(green.bold('Packages bundled successfully!')),
  validateBundles,
  webpackAsync,
  generateWebpackConfig,
  logTap(cyan.bold('[BUNDLING PACKAGES]')),
);

transpile(PROJECT_PACKAGES_ROOT).catch((e) => {
  log(red.bold(e.stack));
  process.exit(1);
});
